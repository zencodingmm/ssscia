const sql = require("./db.js");

// constructor
const Posts = function(posts) {
  this.id = posts.id;
  this.description = posts.description;
  this.cat_type = posts.cat_type;
  this.category_id = posts.category_id;
  this.links = posts.links;
  this.title = posts.title;
  this.images = posts.images;
};

Posts.create = (newposts, result) => {
  sql.query("INSERT INTO tbl_posts SET ?", newposts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posts: ", { id: res.insertId, ...newposts });
    result(null, { id: res.insertId, ...newposts });
  });
};

Posts.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_posts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found posts: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
Posts.findByCategoryID = (id, result) => {
  sql.query(`SELECT * FROM tbl_posts WHERE category_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found posts: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Posts.getAll = (req, result) => {
  let query = "SELECT * FROM tbl_posts";
  if(req.query.cattype) {
    query += ` WHERE cat_type = ${parseInt(req.query.cattype)}`
  }

  if(req.query.category_id) {
    query += ` AND category_id = ${parseInt(req.query.category_id)}`
  }
  if(!req.query.cattype && !req.query.category_id && req.query.description) {
    query += ` WHERE description LIKE '%${req.query.description}%'`
  }
  if (req.query.description) {
    query += ` AND description LIKE '%${req.query.description}%'`;
  }

  query += ` ORDER BY createdAt DESC`


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};



Posts.updateById = (id, posts, result) => {
  sql.query(
    "UPDATE tbl_posts SET description = ?, cat_type = ?, category_id = ?, links = ?, images = ?, title = ? WHERE id = ?",
    [posts.description,posts.cat_type, posts.category_id, posts.links, posts.images, posts.title, id],
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

      console.log("updated posts: ", { id: id, ...posts });
      result(null, { id: id, ...posts });
    }
  );
};

Posts.remove = (id, result) => {
  sql.query("DELETE FROM tbl_posts WHERE id = ?", id, (err, res) => {
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

    console.log("deleted posts with id: ", id);
    result(null, res);
  });
};


module.exports = Posts;