'use strict';
var mongooseModule = require('mongoose');
var Schema = mongooseModule.Schema;

var PictureSchema = new Schema({
	label : String,
	index : Number,
	url : String
});

mongooseModule.model('Picture', PictureSchema);