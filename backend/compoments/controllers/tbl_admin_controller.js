const Admin = require("../model/tbl_admin_model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const admin = new Admin({
        id: req.body.id,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    });

    Admin.create(admin, (err, data) => {
        if(err) res.status(500).send({
            message: err.message || "Some error occurred while creating the admin"
        });

        else res.send(data);
    })
}

exports.findByEmailAndPassword = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const emailAndPassword = {
        email: req.body.email,
        password: req.body.password
    }

    Admin.findByEmailAndPassword(emailAndPassword, (err, data) => {
        if(err) res.status(500).send({
            message: err.message || "User not found"
        });

        else res.send(data);
    })
}