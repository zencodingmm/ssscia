const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../model/tbl_users_model");
const crypto = require("crypto");
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, token) {
  var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'nautical19thureinsoe@gmail.com',
            pass: process.env.NODEMAILER_APP_PASSWORD
        }
    }
  );

  const mailOptions = {
    from: 'SSSCIA',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://localhost:3000/verify/${token}`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log(`Nodemailer error sending email to ${email}`, error);
  }
  
}

router.post("/register", (req, res) => {
	

  const verificationToken = crypto.randomBytes(20).toString('hex');
  const users = new Users({
        user_name: req.body.userName,
        password: req.body.password,
        phone_no: req.body.phoneNo,
        email: req.body.email,
        verified: false,
        verificationToken: verificationToken,
        address: req.body.address,
        user_type: req.body.userType,
    });
  
    // Save Tutorial in the database
    Users.create(users, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Users."
        });
      else {
        sendVerificationEmail(data.email, verificationToken);
        res.send({...data});

      }
    });
})

router.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  Users.verifyToken(token, (err, data) => {
    if (err)
        res.status(500).send({
          message:
            err.message || "Verification error"
        });
      else 
        res.send({...data});
      
  })

})

router.post("/login", (req, res) => {
    Users.findByEmailAndPassword({email: req.body.email, password: req.body.password}, (err, data) => {
      if(err) {
        res.status(500).send({
          message:
            err.message || "Invalid email and password!"
        });
      } else {
        const token = jwt.sign({useremail: data.email, userID: data.userid}, "ssscia");
        Users.createCookie(token, data.email)
        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000,
	        secure: false
        })
        res.send({...data,token, message: "Success"});
      }
    })
})



router.get("/protected", (req, res) => {
  let cookie = req.cookies["token"];
  let claims = jwt.verify(cookie, "ssscia");

  if(claims) {
    res.send(claims)
  } else {
    res.send({message: "unauthenticated."})
  }
})

module.exports = router;