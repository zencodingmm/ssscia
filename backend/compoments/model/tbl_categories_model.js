const sql = require("./db.js");

// constructor
const Categories = function(categories) {
  this.id = categories.id;
  this.cat_type = categories.cat_type;
  this.description = categories.description;
};

Categories.create = (newCategories, result) => {
  sql.query("INSERT INTO tbl_categories SET ?", newCategories, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categories: ", { id: res.insertId, ...newCategories });
    result(null, { id: res.insertId, ...newCategories });
  });
};



Categories.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categories: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
}

Categories.findByCatType = (type, result) => {
 
  sql.query(`SELECT * FROM tbl_categories WHERE cat_type = ${type}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categories: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Categories.getAll = (description, result) => {
  let query = "SELECT * FROM tbl_categories ORDER BY createdAt DESC";

  if (description) {
    query += ` WHERE description LIKE '%${description}%'`;
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



Categories.updateById = (id, categories, result) => {
  sql.query(
    "UPDATE tbl_categories SET description = ? WHERE id = ?",
    [categories.description,  id],
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

      console.log("updated categories: ", { id: id, ...categories });
      result(null, { id: id, ...categories });
    }
  );
};

Categories.remove = (id, result) => {
  sql.query("DELETE FROM tbl_categories WHERE id = ?", id, (err, res) => {
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

    console.log("deleted categores with id: ", id);
    result(null, res);
  });
};


module.exports = Categories;