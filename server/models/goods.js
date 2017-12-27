var mongoose = require ('mongoose')
var db = require ('./db.js')

//创建了一个schema结构。
var goodsSchema = new mongoose.Schema({
	id: {
		type: Number
	},
	goods: {
		type: Array
	}
})

goodsSchema.statics.findAllGoods = function(value, callback) {
	  var id = value
    this.model('goods').findOne({"id": id}, callback);
};
//定义实例方法
goodsSchema.methods.test = function() {
	// console.log(this.foods)
}
//类是基于schema创建的。
var goodsModel = db.model('goods', goodsSchema);
//调用mongoose模型原生的方法
goodsModel.findOne({"type":-1}, function(err,result){
	// result.test()
})
//向外暴露
module.exports = goodsModel;