
const LandFactors = require("../model/tbl_land_factors_model");
const sql = require("../model/db");
const fs = require('fs');
// Create and Save a new Tutorial
exports.create = (req, res) => {
    
    // Create a Tutorial
    const landfactors = new LandFactors({ userid: req.body.userid,
    id:req.body.id, member_id: req.body.member_id, number_of_map:
    req.body.number_of_map, own: req.body.own, rent: req.body.rent, acreage:
    req.body.acreage, pitch_no: req.body.pitch_no, ownership_no:
    req.body.ownership_no, land_type: req.body.land_type,
    acres_of_land_owned: req.body.acres_of_land_owned, acres_of_land_ground:
    req.body.acres_of_land_ground,
    form_seven_form_onehundredfive_acres_of_contract:
    req.body.form_seven_form_onehundredfive_acres_of_contract,
    form_seven_acres_of_applied: req.body.form_seven_acres_of_applied,
    names_of_neighbor_of_farm_east: req.body.names_of_neighbor_of_farm_east,
    names_of_neighbor_of_farm_west: req.body.names_of_neighbor_of_farm_west,
    names_of_neighbor_of_farm_south:
    req.body.names_of_neighbor_of_farm_south,
    names_of_neighbor_of_farm_north:
    req.body.names_of_neighbor_of_farm_north,
    number_of_family_members_by_grandparents:
    req.body.number_of_family_members_by_grandparents, apply_family_one_name:
    req.body.apply_family_one_name, apply_family_one_nrc:
    req.body.apply_family_one_nrc, apply_family_two_name:
    req.body.apply_family_two_name, apply_family_two_nrc:
    req.body.apply_family_two_nrc, time_value: req.body.time_value,
    photo_form_seven: `${req.files.photo_form_seven ? req.files.photo_form_seven
    [0].filename : ""}`,
     photo_form_onehundredfive: `${req.files.photo_form_onehundredfive ? req.files.photo_form_onehundredfive
    [0].filename : ""}`,
     photo_contract: `${req.files.photo_contract ? req.files.photo_contract
    [0].filename : ""}`, 
    photo_ancestral_property: `${req.files.photo_ancestral_property ? req.files.photo_ancestral_property
    [0].filename: ""}`, 
    photo_other: `${req.files.photo_other ? req.files.photo_other
    [0].filename : ""}`, 
    photo_household_chart: `${req.files.photo_household_chart ? req.files.photo_household_chart
    [0].filename : ""}`});
  
    // Save Tutorial in the database
    LandFactors.create(landfactors, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cropfactor."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const number_of_map = req.query.number_of_map;
  
    LandFactors.getAll(number_of_map, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving landfactors."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    LandFactors.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found landfactors with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving landfactors with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  exports.findByMemberId = (req, res) => {
    LandFactors.findByMemberId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found landfactors with member id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving landfactors with member id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  let photo_form_seven  = req.body.old_photo_form_seven;
  let photo_form_onehundredfive = req.body.old_photo_form_onehundredfive;
  let photo_contract = req.body.old_photo_contract;
  let photo_ancestral_property = req.body.old_photo_ancestral_property;
  let photo_other = req.body.old_photo_other;
  let photo_household_chart = req.body.old_photo_household_chart;
  console.log(req.files.photo_other)
  if(req.files) {
    Object.keys(req.files).forEach(fieldname => {
      const oldFilename = req.body[`old_${fieldname}`];
      const filePath = "./uploads/landfactors/" + oldFilename;
      const file = req.files[fieldname][0];
      if(fieldname == "photo_form_seven") {
        photo_form_seven = file.filename;
      }
      if(fieldname == "photo_form_onehundredfive") {
        photo_form_onehundredfive = file.filename;
      }
      if(fieldname == "photo_ancestral_property") {
        photo_ancestral_property = file.filename;
      }
      if(fieldname == "photo_contract") {
        photo_contract = file.filename;
      }
      if(fieldname == "photo_other") {
        photo_other = file.filename;
      }
      if(fieldname == "photo_household_chart") {
        photo_household_chart = file.filename;
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting old file:', err);
        } else {
          console.log('Old file deleted successfully');
        }
      })
    })
  }
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const landfactors = new LandFactors({ userid: req.body.userid,
    id:req.body.id, member_id: req.body.member_id, number_of_map:
    req.body.number_of_map, own: req.body.own, rent: req.body.rent, acreage:
    req.body.acreage, pitch_no: req.body.pitch_no, ownership_no:
    req.body.ownership_no, land_type: req.body.land_type,
    acres_of_land_owned: req.body.acres_of_land_owned, acres_of_land_ground:
    req.body.acres_of_land_ground,
    form_seven_form_onehundredfive_acres_of_contract:
    req.body.form_seven_form_onehundredfive_acres_of_contract,
    form_seven_acres_of_applied: req.body.form_seven_acres_of_applied,
    names_of_neighbor_of_farm_east: req.body.names_of_neighbor_of_farm_east,
    names_of_neighbor_of_farm_west: req.body.names_of_neighbor_of_farm_west,
    names_of_neighbor_of_farm_south:
    req.body.names_of_neighbor_of_farm_south,
    names_of_neighbor_of_farm_north:
    req.body.names_of_neighbor_of_farm_north,
    number_of_family_members_by_grandparents:
    req.body.number_of_family_members_by_grandparents, apply_family_one_name:
    req.body.apply_family_one_name, apply_family_one_nrc:
    req.body.apply_family_one_nrc, apply_family_two_name:
    req.body.apply_family_two_name, apply_family_two_nrc:
    req.body.apply_family_two_nrc, time_value: req.body.time_value,
    photo_form_seven: photo_form_seven,
     photo_form_onehundredfive: photo_form_onehundredfive,
     photo_contract: photo_contract, 
    photo_ancestral_property: photo_ancestral_property, 
    photo_other: photo_other, 
    photo_household_chart: photo_household_chart
  });

  LandFactors.updateById(
    req.params.id,
    landfactors,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found landfactor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating landfactor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    LandFactors.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found landfactor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete landfactor with id " + req.params.id
          });
        }
      } else res.send({ message: `LandFactors was deleted successfully!` });
    });
  };
  
