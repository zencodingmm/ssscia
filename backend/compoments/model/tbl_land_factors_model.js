const sql = require("./db.js");

// constructor
const LandFactors = function(landfactors) {
  this.id = landfactors.id;
  this.userid = landfactors.userid;
  this.member_id = landfactors.member_id;
  this.number_of_map = landfactors.number_of_map;
  this.own = landfactors.own;
  this.rent = landfactors.rent;
  this.acreage = landfactors.acreage;
  this.pitch_no = landfactors.pitch_no;
  this.ownership_no = landfactors.ownership_no;
  this.land_type = landfactors.land_type;
  this.acres_of_land_owned = landfactors.acres_of_land_owned;
  this.acres_of_land_ground = landfactors.acres_of_land_ground;
  this.form_seven_form_onehundredfive_acres_of_contract = landfactors.form_seven_form_onehundredfive_acres_of_contract;
  this.form_seven_acres_of_applied = landfactors.form_seven_acres_of_applied;
  this.names_of_neighbor_of_farm_east = landfactors.names_of_neighbor_of_farm_east;
  this.names_of_neighbor_of_farm_west = landfactors.names_of_neighbor_of_farm_west;
  this.names_of_neighbor_of_farm_south = landfactors.names_of_neighbor_of_farm_south;
  this.names_of_neighbor_of_farm_north = landfactors.names_of_neighbor_of_farm_north;
  this.number_of_family_members_by_grandparents = landfactors.number_of_family_members_by_grandparents;
  this.apply_family_one_name = landfactors.apply_family_one_name;
  this.apply_family_one_nrc = landfactors.apply_family_one_nrc;
  this.apply_family_two_name = landfactors.apply_family_two_name;
  this.apply_family_two_nrc = landfactors.apply_family_two_nrc;
  this.time_value = landfactors.time_value;
  this.photo_form_seven = landfactors.photo_form_seven;
  this.photo_form_onehundredfive = landfactors.photo_form_onehundredfive;
  this.photo_contract = landfactors.photo_contract;
  this.photo_ancestral_property = landfactors.photo_ancestral_property;
  this.photo_other = landfactors.photo_other;
  this.photo_household_chart = landfactors.photo_household_chart;
};

LandFactors.create = (newlandfactors, result) => {
  sql.query("INSERT INTO tbl_land_factors SET ?", newlandfactors, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created landfactors: ", { id: res.insertId, ...newlandfactors });
    result(null, { id: res.insertId, ...newlandfactors });
  });
};

LandFactors.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_land_factors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found landfactors: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
LandFactors.findByMemberId = (id, result) => {
  sql.query(`SELECT * FROM tbl_land_factors WHERE member_id = '${id}'`, (err, res) => {
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


LandFactors.getAll = (number_of_map, result) => {
  let query = "SELECT * FROM tbl_land_factors";

  if (number_of_map) {
    query += ` WHERE number_of_map LIKE '%${number_of_map}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

   
    result(null, res);
  });
};



LandFactors.updateById = (id, landfactors, result) => {
  sql.query(
    "UPDATE tbl_land_factors SET userid = ?, member_id = ?, number_of_map = ?, own = ?, rent = ?, acreage = ?, pitch_no = ?, ownership_no = ?, land_type = ?, acres_of_land_owned = ?, acres_of_land_ground = ?, form_seven_form_onehundredfive_acres_of_contract = ?, form_seven_acres_of_applied = ?, names_of_neighbor_of_farm_east = ?, names_of_neighbor_of_farm_west = ?, names_of_neighbor_of_farm_south = ?, names_of_neighbor_of_farm_north = ?, number_of_family_members_by_grandparents = ?, apply_family_one_name = ?, apply_family_one_nrc = ?, apply_family_two_name = ?, apply_family_two_nrc = ?, time_value = ?, photo_form_seven = ?, photo_form_onehundredfive = ?, photo_contract = ?, photo_ancestral_property = ?, photo_other = ?, photo_household_chart = ? WHERE id = ?",
    [landfactors.userid, landfactors.member_id, landfactors.number_of_map, landfactors.own, landfactors.rent, landfactors.acreage, landfactors.pitch_no, landfactors.ownership_no, landfactors.land_type, landfactors.acres_of_land_owned, landfactors.acres_of_land_ground, landfactors.form_seven_form_onehundredfive_acres_of_contract, landfactors.form_seven_acres_of_applied, landfactors.names_of_neighbor_of_farm_east, landfactors.names_of_neighbor_of_farm_west, landfactors.names_of_neighbor_of_farm_south, landfactors.names_of_neighbor_of_farm_north, landfactors.number_of_family_members_by_grandparents, landfactors.apply_family_one_name, landfactors.apply_family_one_nrc, landfactors.apply_family_two_name, landfactors.apply_family_two_nrc, landfactors.time_value, landfactors.photo_form_seven, landfactors.photo_form_onehundredfive, landfactors.photo_contract, landfactors.photo_ancestral_property, landfactors.photo_other, landfactors.photo_household_chart, id],
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

      result(null, { id: id, ...landfactors });
    }
  );
};

LandFactors.remove = (id, result) => {
  sql.query("DELETE FROM tbl_land_factors WHERE id = ?", id, (err, res) => {
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
    result(null, res);
  });
};


module.exports = LandFactors;