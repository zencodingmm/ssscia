
const Posts = require("../model/tbl_posts_model");
const sql = require("../model/db");
const fs = require('fs');
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    const fileURL = `${req.file.filename}`;
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const posts = new Posts({
        id: req.body.id,
        description: req.body.description,
        cat_type: req.body.cat_type,
        category_id: req.body.category_id,
        links: req.body.links,
        title: req.body.title,
        images: fileURL,
    });
  
    // Save Tutorial in the database
    Posts.create(posts, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Posts."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 6;
  
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  
  
    Posts.getAll(req, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      else {
        const paginatedPosts = data ? data.slice(startIndex, endIndex) : [];
        const totalPages = Math.ceil(data.length / pageSize);
        res.send({
          posts: paginatedPosts,
          totalPages: totalPages
        });
      }
    });
  };

  exports.findOne = (req, res) => {
    Posts.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found posts with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving posts with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.findByCategoryID = (req, res) => {
    Posts.findByCategoryID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found posts with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving posts with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.file) {
    sql.query(`SELECT * FROM tbl_posts WHERE id = ${req.params.id}`, (err, result) => {
      if(err) console.log(err);
      let fileURL = result[0].images;

      const posts = new Posts({
        id: req.body.id,
        description: req.body.description ? req.body.description : "",
        cat_type: req.body.cat_type,
        category_id: req.body.category_id,
        links: req.body.links ? req.body.links : "",
        title: req.body.title ? req.body.title : "",
        images: fileURL,
    });
    
    
      Posts.updateById(
        req.params.id,
        posts,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found posts with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating posts with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
    })

  }

  if(req.file) {
    sql.query(`SELECT * FROM tbl_posts WHERE id = ${req.params.id}`, (err, result) => {
      if(err) console.log(err);
      const filePath = './uploads/posts/' + result[0].images;
      let fileURL = req.file.filename;

      const posts = new Posts({
        id: req.body.id,
        description: req.body.description ? req.body.description : "",
        cat_type: req.body.cat_type,
        category_id: req.body.category_id,
        links: req.body.links ? req.body.links : "",
        title: req.body.title ? req.body.title : "",
        images: fileURL,
    });
    
    
      Posts.updateById(
        req.params.id,
        posts,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found posts with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating posts with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
      
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting old file:', err);
        } else {
          console.log('Old file deleted successfully');
        }
      });
    })
  }

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Posts.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found posts with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete posts with id " + req.params.id
          });
        }
      } else res.send({ message: `Posts was deleted successfully!` });
    });
  };
  
