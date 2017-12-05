var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var sellerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	deliveryTime: {
		type: Number
	},
	score: {
		type: Number
	},
	serviceScore: {
		type: Number
	},
	foodScore: {
		type: Number
	},
	rankRate: {
		type: Number
	},
	minPrice: {
		type: Number
	},
	deliveryPrice: {
		type: Number
	},
	ratingCount: {
		type: Number
	},
	sellCount: {
		type: Number
	},
	bulletin: {
		type: String
	},
	supports: {
		type: Array
	},
	avatar: {
		type: String
	},
	pics: {
		type: Array
	},
	infos: {
		type: Array
	}
})

sellerSchema.statics.findSeller = function(name, callback) {
    this.model('seller').find({}, callback);
};
//类是基于schema创建的。
var sellerModel = db.model('seller', sellerSchema);
//向外暴露
module.exports = sellerModel;