var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var goodsSchema = new mongoose.Schema({
	name: {
		type: String
	},
	price: {
		type: Number
	},
	oldPrice: {
		type: String
	},
	description: {
		type: String
	},
	sellCount: {
		type: Number
	},
	rating: {
		type: Number
	},
	info: {
		type: String
	},
	ratings: {
		type: Array
	},
	icon: {
		type: String
	},
	image: {
		type: String
	}
})

goodsSchema.statics.findAllGoods = function(callback) {
    this.model('good').find({}, callback);
};
//类是基于schema创建的。
var goodsModel = db.model('good', goodsSchema);
//向外暴露
module.exports = goodsModel;