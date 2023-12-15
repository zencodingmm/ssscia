const sql = require('./db.js');

// constructor
const LoanSubmittion = function (loansubmittion) {
	this.id = loansubmittion.id;
	(this.userid = loansubmittion.userid), (this.memberid = loansubmittion.memberid), (this.loan_submit_date = loansubmittion.loan_submit_date);
	this.loan_amount = loansubmittion.loan_amount;
	this.land_value_and_acres_to_be_insured = loansubmittion.land_value_and_acres_to_be_insured;
	this.is_apply_person = loansubmittion.is_apply_person;
	this.relationship_with_supporters = loansubmittion.relationship_with_supporters;
	this.is_current_crop_cultivation = loansubmittion.is_current_crop_cultivation;
	this.is_taken_loan = loansubmittion.is_taken_loan;
	this.proof_of_repayment = loansubmittion.proof_of_repayment;
	this.is_health_and_chronic_disease = loansubmittion.is_health_and_chronic_disease;
	this.supporter_one_name = loansubmittion.supporter_one_name;
	this.supporter_one_nrc = loansubmittion.supporter_one_nrc;
	this.supporter_one_dob = loansubmittion.supporter_one_dob;
	this.supporter_one_age = loansubmittion.supporter_one_age;
	this.supporter_one_place = loansubmittion.supporter_one_place;
	this.supporter_one_phone = loansubmittion.supporter_one_phone;
	this.supporter_two_name = loansubmittion.supporter_two_name;
	this.supporter_two_nrc = loansubmittion.supporter_two_nrc;
	this.supporter_two_dob = loansubmittion.supporter_two_dob;
	this.supporter_two_place = loansubmittion.supporter_two_place;
	this.supporter_two_phone = loansubmittion.supporter_two_phone;
	this.health_supporter = loansubmittion.health_supporter;
	this.photograph_of_land_to_be_insured = loansubmittion.photograph_of_land_to_be_insured;
};

LoanSubmittion.create = (newLoanSubmittion, result) => {
	sql.query('INSERT INTO tbl_loan_submittion SET ?', newLoanSubmittion, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newLoanSubmittion });
	});
};

LoanSubmittion.findById = (id, result) => {
	sql.query(`SELECT * FROM tbl_loan_submittion WHERE id = ${id}`, (err, res) => {
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
LoanSubmittion.findByMemberId = (id, result) => {
	sql.query(`SELECT * FROM tbl_loan_submittion WHERE memberid = '${id}'`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			result(null, res);
			return;
		}

		// not found Tutorial with the id
		result({ kind: 'not_found' }, null);
	});
};

LoanSubmittion.getAll = (loan_amount, result) => {
	let query = 'SELECT * FROM tbl_loan_submittion';

	if (loan_amount) {
		query += ` WHERE loan_amount LIKE '%${loan_amount}%'`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};

LoanSubmittion.updateById = (id, loansubmittion, result) => {
	sql.query(
		'UPDATE tbl_loan_submittion SET loan_submit_date = ?, loan_amount = ?, land_value_and_acres_to_be_insured = ?, is_apply_person = ?, relationship_with_supporters = ?, is_current_crop_cultivation = ?, is_taken_loan = ?, proof_of_repayment = ?, is_health_and_chronic_disease = ?, supporter_one_name = ?, supporter_one_nrc = ?, supporter_one_dob = ?, supporter_one_age = ?, supporter_one_place = ?, supporter_one_phone = ?, supporter_two_name = ?, supporter_two_nrc = ?, supporter_two_dob = ?, supporter_two_place = ?, supporter_two_phone = ?, health_supporter = ?, photograph_of_land_to_be_insured = ? WHERE id = ?',
		[
			loansubmittion.loan_submit_date,
			loansubmittion.loan_amount,
			loansubmittion.land_value_and_acres_to_be_insured,
			loansubmittion.is_apply_person,
			loansubmittion.relationship_with_supporters,
			loansubmittion.is_current_crop_cultivation,
			loansubmittion.is_taken_loan,
			loansubmittion.proof_of_repayment,
			loansubmittion.is_health_and_chronic_disease,
			loansubmittion.supporter_one_name,
			loansubmittion.supporter_one_nrc,
			loansubmittion.supporter_one_dob,
			loansubmittion.supporter_one_age,
			loansubmittion.supporter_one_place,
			loansubmittion.supporter_one_phone,
			loansubmittion.supporter_two_name,
			loansubmittion.supporter_two_nrc,
			loansubmittion.supporter_two_dob,
			loansubmittion.supporter_two_place,
			loansubmittion.supporter_two_phone,
			loansubmittion.health_supporter,
			loansubmittion.photograph_of_land_to_be_insured,
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

			result(null, { id: id, ...loansubmittion });
		},
	);
};

LoanSubmittion.remove = (id, result) => {
	sql.query('DELETE FROM tbl_loan_submittion WHERE id = ?', id, (err, res) => {
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

module.exports = LoanSubmittion;
