var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var ratingsSchema = new mongoose.Schema({
	username: {
		type: String
	},
	rateTime: {
		type: Number
	},
	deliveryTime: {
		type: String
	},
	score: {
		type: Number
	},
	rateType: {
		type: Number
	},
	text: {
		type: String
	},
	avatar: {
		type: String
	},
	recommend: {
		type: Array
	}
})

ratingsSchema.statics.findRatings = function(callback) {
    this.model('ratings').find({}, callback);
};
//类是基于schema创建的。
var ratingsModel = db.model('ratings', ratingsSchema);
//向外暴露
module.exports = ratingsModel;