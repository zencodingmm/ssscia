
const Members = require("../model/tbl_members_model");
const sql = require("../model/db");
const fs = require('fs');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const members = new Members({
      id: req.body.id, 
      member_id:req.body.member_id, 
      userid: req.body.userid, 
      first_name:req.body.first_name ? req.body.first_name : "", 
      last_name: req.body.last_name ? req.body.last_name : "", 
      father_name: req.body.father_name ? req.body.father_name : "", 
      dob: req.body.dob ? req.body.dob : "", 
      education: req.body.education ? req.body.education : "",
      ethnicity: req.body.ethnicity ? req.body.ethnicity: "", 
      religion: req.body.religion ? req.body.religion : "", 
      nrc: req.body.nrc ? req.body.nrc : "", 
      company_name: req.body.company_name ? req.body.company_name : "", 
      company_address: req.body.company_address ? req.body.company_address : "", 
      corn_business_life: req.body.corn_business_life ? req.body.corn_business_life : "", 
      home_address: req.body.home_address ? req.body.home_address : "",
      email_address: req.body.email_address ? req.body.email_address : "", 
      photo: `${req.files.photo ? req.files.photo[0].filename : ""}`, 
      home_no: req.body.home_no ? req.body.home_no : "", 
      home_street: req.body.home_street ? req.body.home_street : "", 
      home_quater: req.body.home_quater ? req.body.home_quater : "", 
      home_village: req.body.home_village ? req.body.home_village : "", 
      home_township: req.body.home_township ? req.body.home_township : "", 
      home_division_state: req.body.home_division_state ? req.body.home_division_state : "", 
      number_of_siblings: req.body.number_of_siblings ? req.body.number_of_siblings : "", 
      phone_no: req.body.phone_no ? req.body.phone_no : "", 
      bank_acc_no: req.body.bank_acc_no ? req.body.bank_acc_no : "", 
      bank_name: req.body.bank_name ? req.body.bank_name : "", 
      payment_app_number: req.body.payment_app_number ? req.body.payment_app_number : "", 
      payment_app_type: req.body.payment_app_type ? req.body.payment_app_type : "",
      nrc_f_photo: `${req.files.nrc_f_photo ? req.files.nrc_f_photo[0].filename : ""}`, 
      nrc_b_photo: `${req.files.nrc_b_photo ? req.files.nrc_b_photo[0].filename : ""}`
    });
  
    // Save Tutorial in the database
    Members.create(members, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Members."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
  
    Members.getAll(first_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving members."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Members.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found members with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving members with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.findByUserID = (req, res) => {
    Members.findByUserID(req.params.userID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found members with id ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving members with id " + req.params.userID
          });
        }
      } else res.send(data);
    })
  }

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

let photo = req.body.old_photo;
let nrc_f_photo = req.body.old_nrc_f_photo;
let nrc_b_photo = req.body.old_nrc_b_photo;
if(req.files) {
  Object.keys(req.files).forEach(fieldname => {
    const oldFilename = req.body[`old_${fieldname}`];
    const filePath = './uploads/members/' + oldFilename
    const file = req.files[fieldname][0];
    if(fieldname == 'photo') {
      photo = file.filename;
    }
    if(fieldname == "nrc_f_photo") {
      nrc_f_photo = file.filename;
    }
    if(fieldname == "nrc_b_photo") {
      nrc_b_photo = file.filename
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting old file:', err);
      } else {
        console.log('Old file deleted successfully');
      }
    });
  
  })
}


  
  const members = new Members({
    member_id:req.body.member_id ? req.body.member_id : "", 
    userid: req.body.userid ? req.body.userid : "", 
    first_name:req.body.first_name ? req.body.first_name : "", 
    last_name: req.body.last_name ? req.body.last_name : "", 
    father_name: req.body.father_name ? req.body.father_name : "", 
    dob: req.body.dob ? req.body.dob : "", 
    education: req.body.education ? req.body.education : "",
    ethnicity: req.body.ethnicity ? req.body.ethnicity : "", 
    religion: req.body.religion ? req.body.religion : "", 
    nrc: req.body.nrc ? req.body.nrc : "", 
    company_name: req.body.company_name ? req.body.company_name : "", 
    company_address: req.body.company_address ? req.body.company_address : "", 
    corn_business_life: req.body.corn_business_life ? req.body.corn_business_life : "", 
    home_address: req.body.home_address ? req.body.home_address : "",
    email_address: req.body.email_address ? req.body.email_address : "", 
    photo: photo, 
    home_no: req.body.home_no ? req.body.home_no : "", 
    home_street: req.body.home_street ? req.body.home_street : "", 
    home_quater: req.body.home_quater ? req.body.home_quater : "", 
    home_village: req.body.home_village ? req.body.home_village : "", 
    home_township: req.body.home_township ? req.body.home_township : "", 
    home_division_state: req.body.home_division_state ? req.body.home_division_state : "", 
    number_of_siblings: req.body.number_of_siblings ? req.body.number_of_siblings : "", 
    phone_no: req.body.phone_no ? req.body.phone_no : "", 
    bank_acc_no: req.body.bank_acc_no ? req.body.bank_acc_no : "", 
    bank_name: req.body.bank_name ? req.body.bank_name : "", 
    payment_app_number: req.body.payment_app_number ? req.body.payment_app_number : "", 
    payment_app_type: req.body.payment_app_type ? req.body.payment_app_type : "",
    nrc_f_photo: nrc_f_photo, 
    nrc_b_photo: nrc_b_photo
  });

  Members.updateById(
    req.params.id,
    members,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found members with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating members with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Members.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found members with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete members with id " + req.params.id
          });
        }
      } else res.send({ message: `Members was deleted successfully!` });
    });
  };
  
