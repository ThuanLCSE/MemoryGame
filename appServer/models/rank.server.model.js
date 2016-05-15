'use strict';
var mongooseModule = require('mongoose');
var Schema = mongooseModule.Schema;

var RankSchema = new Schema({
	fullName : String,
	time : Number,
	score : Number,
	day : Date
});

mongooseModule.model('Rank', RankSchema);