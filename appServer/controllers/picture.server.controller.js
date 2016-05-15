// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Picture = mongoose.model('Picture');
exports.getAll = function(req, res) {
	Picture.find().sort({ index: 1})
	.exec(function(err, pictures) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: 'failed'
			});
		} else {
			res.json(pictures);
		}
	});
};
exports.saveModified = function(req, res) {
	var picture = new Picture(req.body);
	picture.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: "save error"
			});
		} else {
			return res.status(200).send({
				message: "success"
			});
		}
	});
};
