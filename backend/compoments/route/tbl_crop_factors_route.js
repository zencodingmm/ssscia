module.exports = app => {
    const cropfactors = require("../controllers/tbl_crop_factors_controller");
  

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", cropfactors.create);
  
    // Retrieve all Tutorials
    router.get("/", cropfactors.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", cropfactors.findOne);

    router.get("/members/:id", cropfactors.findByMemberId)
  
    // Update a Tutorial with id
    router.put("/:id", cropfactors.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", cropfactors.delete);
  
    app.use('/api/cropfactors', router);
  };