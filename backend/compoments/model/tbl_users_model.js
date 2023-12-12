const sql = require("./db.js");
const bcrypt = require("bcrypt");
// constructor
const Users = function(users) {
  this.userid = users.userid;
  this.user_name = users.user_name;
  this.password = users.password;
  this.phone_no = users.phone_no;
  this.email = users.email;
  this.verified = users.verified;
  this.verificationToken = users.verificationToken;
  this.address = users.address;
  this.user_type = users.user_type;
};


Users.create = (newUser, result) => {
  // Hash the password before saving it
  bcrypt.hash(newUser.password, 10, (hashErr, hash) => {
    if (hashErr) {
      console.log("Error hashing password: ", hashErr);
      result(hashErr, null);
      return;
    }

    const userToSave = { ...newUser, password: hash };

    sql.query("INSERT INTO tbl_users SET ?", userToSave, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created users: ", { userid: res.insertId, ...userToSave });
      result(null, { userid: res.insertId, ...userToSave });
    });
  });
};



Users.findById = (userid, result) => {
  sql.query(`SELECT * FROM tbl_users WHERE userid = ${userid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
Users.findByCookie = (cookie, result) => {
  sql.query(`SELECT * FROM tbl_users WHERE cookie = ${cookie}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.findByEmailAndPassword = (userEmailAndPassword, result) => {
  sql.query(`SELECT * FROM tbl_users WHERE email = ?`, userEmailAndPassword.email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      bcrypt.compare(userEmailAndPassword.password, res[0].password, (compareErr, compareResult) => {
        if (compareErr) {
          console.log("Error comparing passwords: ", compareErr);
          result(compareErr, null);
          return;
        }
        
        if (compareResult) {
          console.log("found users: ", res[0]);
          result(null, res[0]);
        } else {
          result({ kind: "not_found" }, null);
        }
      });
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};


Users.getAll = (user_name, result) => {
  let query = "SELECT * FROM tbl_users";

  if (user_name) {
    query += ` WHERE user_name LIKE '%${user_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};



Users.updateById = (userid, users, result) => {
  sql.query(
    "UPDATE tbl_users SET user_name = ?, password = ?, phone_no = ?, email = ?, address = ?, user_type = ? WHERE userid = ?",
    [users.user_name, users.password, users.phone_no, users.email, users.address, users.user_type, userid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated users: ", { userid: userid, ...users });
      result(null, { userid: userid, ...users });
    }
  );
};

Users.remove = (userid, result) => {
  sql.query("DELETE FROM tbl_users WHERE userid = ?", userid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted users with userid: ", userid);
    result(null, res);
  });
};

Users.verifyToken = (token, result) => {
  sql.query('UPDATE tbl_users SET verified = true WHERE verificationToken = ?', token, (err, res) => {
    if (err) {
      console.error('Error verifying user', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ message: "No token found" }, null);
      return;
    }
    
    result(null, {message: "success"});
  });
}

Users.createCookie = (token, email) => {
  console.log(token)
  console.log(email);
	sql.query('UPDATE tbl_users SET cookie = ? WHERE email = ?', [token, email], (err, res) => {
	if(err) {
		console.log(err);
		return;
	}

	console.log(res);
});
}



module.exports = Users;