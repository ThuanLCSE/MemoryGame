// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Rank = mongoose.model('Rank');
exports.getAll = function(req, res) {
	Rank.find().sort({ time : -1})
	.exec(function(err, scoreBoard) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: 'get all failed'
			});
		} else {
			res.json(scoreBoard);
		}
	});
};
exports.saveNewScore = function(req, res) {
	var newScore = new Rank(req.body);
	newScore.save(function(err) {
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
exports.updateNewScore = function(req, res) {
	var userFullName= req.body.fullName;
	Rank.findOne({
        fullName: userFullName
    }, function(err, rankData) {
        if (!rankData) {
            return res.status(400).send({
                message: 'Cannot find name'
            });
        } else {
        	console.log(rankData);
        	rankData.score = req.body.score;
        	rankData.time = req.body.time;
        	rankData.day = req.body.day;
            rankData.save(function(err, updatedData) {
                if (err) {
                    // If an error occurs send the error message
                    return res.status(400).send({
                        message: 'save failed'
                    });
                } else {
                    return res.status(200).send(updatedData);
                }
            });
        }
    });
};
