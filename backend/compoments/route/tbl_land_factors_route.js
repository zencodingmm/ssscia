module.exports = app => {
    const landfactors = require("../controllers/tbl_land_factors_controller");
    const multer = require("multer");
    const crypto = require("crypto");
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/landfactors"); // Specify the directory where files will be stored
      },
      filename: function (req, file, cb) {
        const randomFilename = crypto.randomBytes(16).toString('hex');
        const timestamp = Date.now();
        const filename = `${timestamp}-${randomFilename}${file.originalname}`;
        cb(null, filename);
      }
    });

    const upload = multer({ storage: storage}) 
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/",upload.fields([
  { name: 'photo_form_seven' },
  { name: 'photo_form_onehundredfive' },
  { name: 'photo_contract' },
  { name: 'photo_ancestral_property' },
  { name: 'photo_other' },
  { name: 'photo_household_chart' }
]), landfactors.create);
  
    // Retrieve all Tutorials
    router.get("/", landfactors.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", landfactors.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",upload.fields([
      { name: 'photo_form_seven' },
      { name: 'photo_form_onehundredfive' },
      { name: 'photo_contract' },
      { name: 'photo_ancestral_property' },
      { name: 'photo_other' },
      { name: 'photo_household_chart' }
    ]), landfactors.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", landfactors.delete);

    router.get("/members/:id", landfactors.findByMemberId)
  
    app.use('/api/landfactors', router);
  };