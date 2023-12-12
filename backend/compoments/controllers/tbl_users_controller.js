
const Users = require("../model/tbl_users_model");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const users = new Users({
        userid: req.body.userid,
        user_name: req.body.user_name,
        password: req.body.password,
        phone_no: req.body.phone_no,
        email: req.body.email,
        address: req.body.address,
        user_type: req.body.user_type,
    });
  
    // Save Tutorial in the database
    Users.create(users, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Users."
        });
      else res.send(data);
    });
  };  

  exports.findAll = (req, res) => {
    const user_name = req.query.user_name;
  
    Users.getAll(user_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Users.findById(req.params.userid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found users with userid ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving users with userid " + req.params.userid
          });
        }
      } else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Users.updateById(
    req.params.userid,
    new Users(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found users with userid ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating users with userid " + req.params.userid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Users.remove(req.params.userid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found users with userid ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete users with userid " + req.params.userid
          });
        }
      } else res.send({ message: `Users users deleted successfully!` });
    });
  };
  
