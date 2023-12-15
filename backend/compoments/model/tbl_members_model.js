const sql = require('./db.js');

// constructor
const Members = function (members) {
	this.id = members.id;
	this.member_id = members.member_id;
	this.userid = members.userid;
	this.first_name = members.first_name;
	this.last_name = members.last_name;
	this.father_name = members.father_name;
	this.dob = members.dob;
	this.education = members.education;
	this.ethnicity = members.ethnicity;
	this.religion = members.religion;
	this.nrc = members.nrc;
	this.company_name = members.company_name;
	this.company_address = members.company_address;
	this.corn_business_life = members.corn_business_life;
	this.home_address = members.home_address;
	this.email_address = members.email_address;
	this.photo = members.photo;
	this.home_no = members.home_no;
	this.home_street = members.home_street;
	this.home_quater = members.home_quater;
	this.home_village = members.home_village;
	this.home_township = members.home_township;
	this.home_division_state = members.home_division_state;
	this.number_of_siblings = members.number_of_siblings;
	this.phone_no = members.phone_no;
	this.bank_acc_no = members.bank_acc_no;
	this.bank_name = members.bank_name;
	this.payment_app_number = members.payment_app_number;
	this.payment_app_type = members.payment_app_type;
	this.nrc_f_photo = members.nrc_f_photo;
	this.nrc_b_photo = members.nrc_b_photo;
};

Members.create = (newMembers, result) => {
	sql.query('INSERT INTO tbl_members SET ?', newMembers, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newMembers });
	});
};

Members.findById = (id, result) => {
	sql.query(`SELECT * FROM tbl_members WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}

		// not found Tutorial with the id
		result({ kind: 'not_found' }, null);
	});
};

Members.findByUserID = (userID, result) => {
	sql.query(`SELECT * FROM tbl_members WHERE userid=${userID}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}

		// not found Tutorial with the id
		result({ kind: 'not_found' }, null);
	});
};

Members.getAll = (first_name, result) => {
	let query = 'SELECT * FROM tbl_members';

	if (first_name) {
		query += ` WHERE first_name LIKE '%${first_name}%'`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Members.updateById = (id, members, result) => {
	sql.query(
		'UPDATE tbl_members SET member_id = ?, userid = ?, first_name = ?, last_name = ?, father_name = ?, dob = ?, education = ?, ethnicity = ?, religion = ?, nrc = ?, company_name = ?, company_address = ?, corn_business_life = ?, home_address = ?, email_address = ?, photo = ?, home_no = ?, home_street = ?, home_quater = ?, home_village = ?, home_township = ?, home_division_state = ?, number_of_siblings = ?, phone_no = ?, bank_acc_no = ?, bank_name = ?, payment_app_number = ?, payment_app_type = ?, nrc_f_photo = ?, nrc_b_photo = ? WHERE id = ?',
		[
			members.member_id,
			members.userid,
			members.first_name,
			members.last_name,
			members.father_name,
			members.dob,
			members.education,
			members.ethnicity,
			members.religion,
			members.nrc,
			members.company_name,
			members.company_address,
			members.corn_business_life,
			members.home_address,
			members.email_address,
			members.photo,
			members.home_no,
			members.home_street,
			members.home_quater,
			members.home_village,
			members.home_township,
			members.home_division_state,
			members.number_of_siblings,
			members.phone_no,
			members.bank_acc_no,
			members.bank_name,
			members.payment_app_number,
			members.payment_app_type,
			members.nrc_f_photo,
			members.nrc_b_photo,
			id,
		],
		(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Tutorial with the id
				result({ kind: 'not_found' }, null);
				return;
			}

			result(null, { id: id, ...members });
		},
	);
};

Members.remove = (id, result) => {
	sql.query('DELETE FROM tbl_members WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Tutorial with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		result(null, res);
	});
};

module.exports = Members;
