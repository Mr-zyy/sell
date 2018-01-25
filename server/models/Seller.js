var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var sellerSchema = new mongoose.Schema({
	hasMore: {
		type: Boolean
	},
	page: {
		type: Number
	},
	data: {
		type: Array
	}
})

sellerSchema.statics.findSeller = function(value, callback) {
    // this.model('sellers').findOne({"id": value}, callback);
    value = parseInt(value)
    this.model('sellers').aggregate().unwind('data').match({'data.id': value}).exec(callback)
};
// sellerSchema.methods.addId = function() {
// 	console.log(this.id)
// }
sellerSchema.statics.searchSellers = function(value, callback) {
	// this.model('sellers').find({"name": value}, callback)
	this.model('sellers').aggregate().unwind('data').match({'data.name': value}).exec(callback)
}
sellerSchema.statics.findAllSeller = function(page, callback) {
	// this.model('sellers').find({}, callback)
	this.model('sellers').aggregate().match({'page': page}).exec(callback)
}
//类是基于schema创建的。
var sellerModel = db.model('sellers', sellerSchema);
// sellerModel.findOne({}, function(err,data) {
// 	data.addId()
// })
//向外暴露
module.exports = sellerModel;