module.exports = app => {
    const members = require("../controllers/tbl_members_controller");
    const multer = require("multer");
    const crypto = require("crypto");
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/members"); // Specify the directory where files will be stored
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
    router.post("/",upload.fields([{
      name: "photo"
    }, {
      name: "nrc_f_photo"
    }, {
      name: "nrc_b_photo"
    }]), members.create);
  
    // Retrieve all Tutorials
    router.get("/", members.findAll);
    
    // Retrieve a single Tutorial with id
    // router.get("/:id", members.findOne);


    router.get("/:userID", members.findByUserID)
  
    // Update a Tutorial with id
    router.put("/:id", upload.fields([{
      name: "photo"
    }, {
      name: "nrc_f_photo"
    }, {
      name: "nrc_b_photo"
    }]) ,members.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", members.delete);
  
    app.use('/api/members', router);
  };