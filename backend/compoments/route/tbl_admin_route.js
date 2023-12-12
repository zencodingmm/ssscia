module.exports = (app) => {
    const AdminController = require("../controllers/tbl_admin_controller");

    const router = require("express").Router();
    
    // Create a new admin
    router.post("/create", AdminController.create);

    // Get admin by email and password
    router.post("/", AdminController.findByEmailAndPassword);

    app.use("/api/admin", router);


}