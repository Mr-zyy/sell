var Seller = require("./../models/Seller.js")
var Goods = require("./../models/goods.js")
var Ratings = require("./../models/ratings.js")
var sellData = null
var goodsData = null
var ratingData = null

exports.showAllGoods = function(req,res,next){
	let id = req.query.id
	Goods.findAllGoods(id, function(err,data){
		goodsData = data.goods
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

exports.showSeller = function(req,res,next){
	let id = req.query.id
	Seller.findSeller(id,function(err,data){
		 sellerData = data[0].data
		 res.json({
		 	errno:0,
		 	data:sellerData
		 })
	})
}


exports.searchSeller = function(req, res, next){
	let name = req.query.seller
	Seller.searchSellers(name, function(err, data){
		let arr = [data[0].data]
		if (arr.length > 0){
			res.json({
				errno: 0,
				data: arr
		  })
		} else {
			res.json({
				errno: 1
			})
		}
	})
}
exports.findAllSellers = function(req, res, next) {
	let page = parseInt(req.query.page)
	Seller.findAllSeller(page, function(err, data) {
		let arr = data[0].data
		let hasMore = data[0].hasMore
		if (arr.length > 0){
			res.json({
				errno: 0,
				data: arr,
				hasMore
		  })
		} else {
			res.json({
				errno: 1
			})
		}
	})
}