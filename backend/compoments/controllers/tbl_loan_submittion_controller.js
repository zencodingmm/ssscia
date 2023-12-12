
const LoanSubmittion = require("../model/tbl_loan_submittion_model");
const sql = require("../model/db");
const fs = require('fs');
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    let photograph_of_land_to_be_insured = req.files.filter((photo, index) => (photo.fieldname === "photograph_of_land_to_be_insured"));
    let proof_of_repayment = req.files.filter((photo, index) => (photo.fieldname === "proof_of_repayment"))
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const loabsubmittion = new LoanSubmittion({
        id: req.body.id,
        userid: req.body.userid,
        memberid: req.body.memberid,
        loan_submit_date: req.body.loan_submit_date,
        loan_amount: req.body.loan_amount,
        land_value_and_acres_to_be_insured: req.body.land_value_and_acres_to_be_insured,
        is_apply_person: req.body.is_apply_person,
        relationship_with_supporters: req.body.relationship_with_supporters,
        is_current_crop_cultivation: req.body.is_current_crop_cultivation,
        is_taken_loan: req.body.is_taken_loan,
        proof_of_repayment: `${proof_of_repayment[0].filename}`,
        is_health_and_chronic_disease: (req.body.is_health_and_chronic_disease == true ? 1 : 0),
        supporter_one_name: req.body.supporter_one_name,
        supporter_one_nrc: req.body.supporter_one_nrc,
        supporter_one_dob: req.body.supporter_one_dob,
        supporter_one_age: req.body.supporter_one_age,
        supporter_one_place: req.body.supporter_one_place,
        supporter_one_phone: req.body.supporter_one_phone,
        supporter_two_name: req.body.supporter_two_name,
        supporter_two_nrc: req.body.supporter_two_nrc,
        supporter_two_dob: req.body.supporter_two_dob,
        supporter_two_place: req.body.supporter_two_place,
        supporter_two_phone: req.body.supporter_two_phone,
        health_supporter: req.body.health_supporter,
        photograph_of_land_to_be_insured: `${photograph_of_land_to_be_insured[0].filename}`,
    });
  
    // Save Tutorial in the database
    LoanSubmittion.create(loabsubmittion, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the loan_amount."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const loan_amount = req.query.loan_amount;
  
    LoanSubmittion.getAll(loan_amount, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving loan_amount."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    LoanSubmittion.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found loabsubmittion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving loabsubmittion with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  exports.findByMemberId = (req, res) => {
    LoanSubmittion.findByMemberId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found loabsubmittion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving loabsubmittion with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {

  // Validate Request
  let proof_of_repayment = req.body.old_proof_of_repayment;
  let photograph_of_land_to_be_insured = req.body.old_photograph_of_land_to_be_insured;
  if(req.files) {
    Object.keys(req.files).forEach(fieldname => {
      const oldFilename = req.body[`old_${fieldname}`];
      const filePath = "./uploads/loansubmittion/" + oldFilename;
  
      const file = req.files[fieldname][0];
      if(fieldname == "proof_of_repayment") {
        proof_of_repayment = file.filename;
      }
      if(fieldname == "photograph_of_land_to_be_insured") {
        photograph_of_land_to_be_insured = file.filename;
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting old file:', err);
        } else {
          console.log('Old file deleted successfully');
        }
      })
  
    
  });
  }
  


  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const loabsubmittion = new LoanSubmittion({
    id: req.body.id,
    userid: req.body.userid,
    memberid: req.body.memberid,
    loan_submit_date: req.body.loan_submit_date,
    loan_amount: req.body.loan_amount,
    land_value_and_acres_to_be_insured: req.body.land_value_and_acres_to_be_insured,
    is_apply_person: req.body.is_apply_person,
    relationship_with_supporters: req.body.relationship_with_supporters,
    is_current_crop_cultivation: req.body.is_current_crop_cultivation,
    is_taken_loan: req.body.is_taken_loan,
    proof_of_repayment: proof_of_repayment,
    is_health_and_chronic_disease: (req.body.is_health_and_chronic_disease == true ? 1 : 0),
    supporter_one_name: req.body.supporter_one_name,
    supporter_one_nrc: req.body.supporter_one_nrc,
    supporter_one_dob: req.body.supporter_one_dob,
    supporter_one_age: req.body.supporter_one_age,
    supporter_one_place: req.body.supporter_one_place,
    supporter_one_phone: req.body.supporter_one_phone,
    supporter_two_name: req.body.supporter_two_name,
    supporter_two_nrc: req.body.supporter_two_nrc,
    supporter_two_dob: req.body.supporter_two_dob,
    supporter_two_place: req.body.supporter_two_place,
    supporter_two_phone: req.body.supporter_two_phone,
    health_supporter: req.body.health_supporter,
    photograph_of_land_to_be_insured: photograph_of_land_to_be_insured,
});

  LoanSubmittion.updateById(
    req.params.id,
    loabsubmittion,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found loabsubmittion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating loabsubmittion with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    LoanSubmittion.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found loabsubmittion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete loabsubmittion with id " + req.params.id
          });
        }
      } else res.send({ message: `LoabSubmittion was deleted successfully!` });
    });
  };
  
