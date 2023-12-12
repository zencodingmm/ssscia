const sql = require("./db.js");

// constructor
const CropFactors = function(cropfactors) {
  this.id = cropfactors.id;
  this.userid = cropfactors.userid;
  this.member_id = cropfactors.member_id;
  this.land_improvement = cropfactors.land_improvement;
  this.land_improvement_costs = cropfactors.land_improvement_costs;
  this.type_of_seed_name = cropfactors.type_of_seed_name;
  this.type_of_seed_beds_no = cropfactors.type_of_seed_beds_no;
  this.type_of_seed_cost = cropfactors.type_of_seed_cost;
  this.type_of_seed_buy_shop = cropfactors.type_of_seed_buy_shop;
  this.manure_name = cropfactors.manure_name;
  this.manure_beds_no = cropfactors.manure_beds_no;
  this.manure_cost = cropfactors.manure_cost;
  this.manure_manpower = cropfactors.manure_manpower;
  this.manure_buy_shop = cropfactors.manure_buy_shop;
  this.pesticides_type = cropfactors.pesticides_type;
  this.pesticides_frequency_of_spraying = cropfactors.pesticides_frequency_of_spraying;
  this.pesticides_manpower = cropfactors.pesticides_manpower;
  this.pesticides_cost = cropfactors.pesticides_cost;
  this.pesticides_buy_shop = cropfactors.pesticides_buy_shop;
  this.types_of_crops_grown_and_acreage = cropfactors.types_of_crops_grown_and_acreage;
  this.harvesting_and_threshing_own = cropfactors.harvesting_and_threshing_own;
  this.harvesting_and_threshing_rental = cropfactors.harvesting_and_threshing_rental;
  this.harvesting_and_threshing_type = cropfactors.harvesting_and_threshing_type;
  this.harvesting_and_threshing_manpower = cropfactors.harvesting_and_threshing_manpower;
  this.harvesting_and_threshing_savings_costs = cropfactors.harvesting_and_threshing_savings_costs;
  this.harvesting_and_threshing_device_name = cropfactors.harvesting_and_threshing_device_name;
  this.one_acre_output = cropfactors.one_acre_output;
  this.total_yield = cropfactors.total_yield;
  this.sales_fair_or_dealer = cropfactors.sales_fair_or_dealer;
  this.sales_fair_or_dealer_price_received = cropfactors.sales_fair_or_dealer_price_received;
  this.isloan = cropfactors.isloan;
  this.loan_person = cropfactors.loan_person;
  this.is_seed_loan = cropfactors.is_seed_loan;
  this.seen_loan_person = cropfactors.seen_loan_person;
  this.is_fertilizer_loan = cropfactors.is_fertilizer_loan;
  this.fertilizer_loan_person = cropfactors.fertilizer_loan_person;
};

CropFactors.create = (newCropFactors, result) => {
  sql.query("INSERT INTO tbl_crop_factors SET ?", newCropFactors, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created CropFactors: ", { id: res.insertId, ...newCropFactors });
    result(null, { id: res.insertId, ...newCropFactors });
  });
};

CropFactors.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_crop_factors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found CropFactors: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

CropFactors.findByMemberId = (id, result) => {
  sql.query(`SELECT * FROM tbl_crop_factors WHERE member_id = '${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

CropFactors.getAll = (land_improvement, result) => {
  let query = "SELECT * FROM tbl_crop_factors";

  if (land_improvement) {
    query += ` WHERE land_improvement LIKE '%${land_improvement}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};



CropFactors.updateById = (id, cropfactors, result) => {
  sql.query(
    "UPDATE tbl_crop_factors SET userid = ?, member_id = ?, land_improvement = ?, land_improvement_costs = ?, type_of_seed_name = ?, type_of_seed_beds_no = ?, type_of_seed_cost = ?, type_of_seed_buy_shop = ?, manure_name = ?, manure_beds_no = ?, manure_cost = ?, manure_manpower = ?, manure_buy_shop = ?, pesticides_type = ?, pesticides_frequency_of_spraying = ?, pesticides_manpower = ?, pesticides_cost = ?, pesticides_buy_shop = ?, types_of_crops_grown_and_acreage = ?, harvesting_and_threshing_own = ?, harvesting_and_threshing_rental = ?, harvesting_and_threshing_type = ?, harvesting_and_threshing_manpower = ?, harvesting_and_threshing_savings_costs = ?, harvesting_and_threshing_device_name = ?, one_acre_output = ?, total_yield = ?, sales_fair_or_dealer = ?, sales_fair_or_dealer_price_received = ?, isloan = ?, loan_person = ?, is_seed_loan = ?, seen_loan_person = ?, is_fertilizer_loan = ?, fertilizer_loan_person = ? WHERE id = ?",
    [cropfactors.userid, cropfactors.member_id, cropfactors.land_improvement, cropfactors.land_improvement_costs, cropfactors.type_of_seed_name, cropfactors.type_of_seed_beds_no, cropfactors.type_of_seed_cost, cropfactors.type_of_seed_buy_shop, cropfactors.manure_name, cropfactors.manure_beds_no, cropfactors.manure_cost, cropfactors.manure_manpower, cropfactors.manure_buy_shop, cropfactors.pesticides_type, cropfactors.pesticides_frequency_of_spraying, cropfactors.pesticides_manpower, cropfactors.pesticides_cost, cropfactors.pesticides_buy_shop, cropfactors.types_of_crops_grown_and_acreage, cropfactors.harvesting_and_threshing_own, cropfactors.harvesting_and_threshing_rental, cropfactors.harvesting_and_threshing_type, cropfactors.harvesting_and_threshing_manpower, cropfactors.harvesting_and_threshing_savings_costs, cropfactors.harvesting_and_threshing_device_name, cropfactors.one_acre_output, cropfactors.total_yield, cropfactors.sales_fair_or_dealer, cropfactors.sales_fair_or_dealer_price_received, cropfactors.isloan, cropfactors.loan_person, cropfactors.is_seed_loan, cropfactors.seen_loan_person, cropfactors.is_fertilizer_loan, cropfactors.fertilizer_loan_person, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cropfactors: ", { id: id, ...cropfactors });
      result(null, { id: id, ...cropfactors });
    }
  );
};

CropFactors.remove = (id, result) => {
  sql.query("DELETE FROM tbl_crop_factors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cropfactors with id: ", id);
    result(null, res);
  });
};


module.exports = CropFactors;