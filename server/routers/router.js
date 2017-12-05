var Seller = require("./../models/Seller.js")
var Goods = require("./../models/goods.js")
var Ratings = require("./../models/ratings.js")
var sellData = null
var goodsData = null
var ratingData = null

exports.showSeller = function(req,res,next){
	Seller.findSeller("",function(err,data){
		 sellerData = data
		 res.json({
		 	errno:0,
		 	data:sellerData
		 })
	})
}

exports.showAllGoods = function(req,res,next){
	Goods.findAllGoods(function(err,data){
		goodsData = data
		res.json({
		 	errno:0,
		 	data:goodsData
		 })
	})
}
exports.showRatings = function(req,res,next){
	Ratings.findRatings(function(err,data){
		ratingsData = data
		res.json({
		 	errno:0,
		 	data:ratingsData
		 })
	})
}