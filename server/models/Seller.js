var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var sellerSchema = new mongoose.Schema({
	id: {
		type: Number
	},
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

sellerSchema.statics.findSeller = function(value, callback) {
    this.model('sellers').findOne({"id": value}, callback);
};
// sellerSchema.methods.addId = function() {
// 	console.log(this.id)
// }
sellerSchema.statics.searchSellers = function(value, callback) {
	this.model('sellers').find({"name": value}, callback)
}
sellerSchema.statics.findAllSeller = function(callback) {
	this.model('sellers').find({}, callback)
}
//类是基于schema创建的。
var sellerModel = db.model('sellers', sellerSchema);
// sellerModel.findOne({}, function(err,data) {
// 	data.addId()
// })
//向外暴露
module.exports = sellerModel;