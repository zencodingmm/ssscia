module.exports = app => {
    const users = require("../controllers/tbl_users_controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:userid", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:userid", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:userid", users.delete);
  
    app.use('/api/users', router);
  };