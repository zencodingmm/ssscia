const CropFactors = require('../model/tbl_crop_factors_model');

// Create and Save a new Tutorial
exports.create = (req, res) => {
	// Validate request

	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	// Create a Tutorial
	const cropfactors = new CropFactors({
		id: req.body.id,
		userid: req.body.userid,
		member_id: req.body.member_id,
		land_improvement: req.body.land_improvement,
		land_improvement_costs: req.body.land_improvement_costs,
		type_of_seed_name: req.body.type_of_seed_name,
		type_of_seed_beds_no: req.body.type_of_seed_beds_no,
		type_of_seed_cost: req.body.type_of_seed_cost,
		type_of_seed_buy_shop: req.body.type_of_seed_buy_shop,
		manure_name: req.body.manure_name,
		manure_beds_no: req.body.manure_beds_no,
		manure_cost: req.body.manure_cost,
		manure_manpower: req.body.manure_manpower,
		manure_buy_shop: req.body.manure_buy_shop,
		pesticides_type: req.body.pesticides_type,
		pesticides_frequency_of_spraying: req.body.pesticides_frequency_of_spraying,
		pesticides_manpower: req.body.pesticides_manpower,
		pesticides_cost: req.body.pesticides_cost,
		pesticides_buy_shop: req.body.pesticides_buy_shop,
		types_of_crops_grown_and_acreage: req.body.types_of_crops_grown_and_acreage,
		harvesting_and_threshing_own: req.body.harvesting_and_threshing_own,
		harvesting_and_threshing_rental: req.body.harvesting_and_threshing_rental,
		harvesting_and_threshing_type: req.body.harvesting_and_threshing_type,
		harvesting_and_threshing_manpower: req.body.harvesting_and_threshing_manpower,
		harvesting_and_threshing_savings_costs: req.body.harvesting_and_threshing_savings_costs,
		harvesting_and_threshing_device_name: req.body.harvesting_and_threshing_device_name,
		one_acre_output: req.body.one_acre_output,
		total_yield: req.body.total_yield,
		sales_fair_or_dealer: req.body.sales_fair_or_dealer,
		sales_fair_or_dealer_price_received: req.body.sales_fair_or_dealer_price_received,
		isloan: req.body.isloan,
		loan_person: req.body.loan_person,
		is_seed_loan: req.body.is_seed_loan,
		seen_loan_person: req.body.seen_loan_person,
		is_fertilizer_loan: req.body.is_fertilizer_loan,
		fertilizer_loan_person: req.body.fertilizer_loan_person,
	});

	// Save Tutorial in the database
	CropFactors.create(cropfactors, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Cropfactor.',
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	const land_improvement = req.query.land_improvement;

	CropFactors.getAll(land_improvement, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving cropfactors.',
			});
		else res.send(data);
	});
};

exports.findOne = (req, res) => {
	CropFactors.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found cropfactors with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving cropfactors with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};
exports.findByMemberId = (req, res) => {
	CropFactors.findByMemberId(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found cropfactors with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving cropfactors with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}

	CropFactors.updateById(req.params.id, new CropFactors(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found cropfactor with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Error updating cropfactor with id ' + req.params.id,
				});
			}
		} else res.send(data);
	});
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
	CropFactors.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found cropfactor with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: 'Could not delete cropfactor with id ' + req.params.id,
				});
			}
		} else res.send({ message: `FropFactor was deleted successfully!` });
	});
};
