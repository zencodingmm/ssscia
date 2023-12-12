
const Categories = require("../model/tbl_categories_model");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const categories = new Categories({
        id: req.body.id,
        cat_type: req.body.cat_type,
        description: req.body.description,
    });
  
    // Save Tutorial in the database
    Categories.create(categories, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Categories."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const description = req.query.description;
  
    Categories.getAll(description, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Categories.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found categories with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving categories with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.findByCatType = (req, res) => {
    console.log(req.query.type)
    Categories.findByCatType(req.query.type, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found categories with id ${req.query.type}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving categories with id " + req.query.type
          });
        }
      } else res.send(data);
    });
  }

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Categories.updateById(
    req.params.id,
    new Categories(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found categories with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating categories with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Categories.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found categories with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete categories with id " + req.params.id
          });
        }
      } else res.send({ message: `Categories was deleted successfully!` });
    });
  };
  
