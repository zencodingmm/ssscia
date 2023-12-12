const sql = require("./db.js");
const bcrypt = require("bcrypt");

const Admin = function(admin) {
    this.id = admin.id;
    this.user_name = admin.user_name;
    this.email = admin.email;
    this.password = admin.password;
} 

Admin.create = (newAdmin, result) => {
    bcrypt.hash(newAdmin.password, 10, (hashErr, hash) => {
        if(hashErr) {
            console.log("error hashing password: ",  hashErr);
            result(hashErr, null);
            return;
        }

        const adminToSave = {
            ...newAdmin,
            password: hash
        }

        sql.query("INSERT INTO admin SET ?", adminToSave, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("Created users: ", {
                id: res.insertId,
                ...adminToSave
            });

            result(null, {id: res.insertId, ...adminToSave})
        })
    })
}

Admin.findByEmailAndPassword = (adminEmailAndPassword, result) => {
    sql.query(`SELECT * FROM admin WHERE email = ?`, adminEmailAndPassword.email, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            bcrypt.compare(adminEmailAndPassword.password, res[0].password, (compareErr, compareResult) => {
                if(compareErr) {
                    console.log("Password compare error: ", compareErr)
                    result(compareErr, null);
                    return;
                }

                if(compareResult) {
                    console.log("Found users: ", res[0]);
                    result(null, {message: "success"});
                } else {
                    result({
                        message: "Not found"
                    }, null)
                }
            })
        } else {
            result({message: "Not found"}, null)
        }
    })
}

module.exports = Admin;