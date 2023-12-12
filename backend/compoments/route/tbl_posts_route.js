module.exports = app => {
    const posts = require("../controllers/tbl_posts_controller");
    const multer = require("multer");
    const crypto = require("crypto");
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/posts"); // Specify the directory where files will be stored
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
    router.post("/",upload.single("images"), posts.create);
  
    // Retrieve all Tutorials
    router.get("/", posts.findAll);


    
    // Retrieve a single Tutorial with id
    router.get("/:id", posts.findOne);

    // Retrieve posts with specified category id
    router.get("/categories/:id", posts.findByCategoryID);
  
    // Update a Tutorial with id
    router.put("/:id", upload.single("images"), posts.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", posts.delete);
  
    app.use('/api/posts', router);
  };