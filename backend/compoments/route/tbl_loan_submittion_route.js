module.exports = app => {
    const loansubmittion = require("../controllers/tbl_loan_submittion_controller");
    const multer = require("multer");
    const crypto = require("crypto");
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/loansubmittion"); // Specify the directory where files will be stored
      },
      filename: function (req, file, cb) {
        const randomFilename = crypto.randomBytes(16).toString('hex');
        const timestamp = Date.now();
        const filename = `${timestamp}-${randomFilename}${file.originalname}`;
        cb(null, filename);
      }
    });

    const upload = multer({ storage: storage})
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/",upload.any(), loansubmittion.create);
  
    // Retrieve all Tutorials
    router.get("/", loansubmittion.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", loansubmittion.findOne);

    router.get("/members/:id", loansubmittion.findByMemberId)
  
    // Update a Tutorial with id
    router.put("/:id",upload.fields([
      {
        name: "proof_of_repayment",
        maxCount: 1
      },
      {
       name: "photograph_of_land_to_be_insured",
       maxCount: 1
      }
    ]), loansubmittion.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", loansubmittion.delete);
  
    app.use('/api/loansubmittion', router);
  };