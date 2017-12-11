var express = require("express")
var app = express()
var router = require("./routers/router.js")
//cors 解决跨域问题
// app.all('/api/seller',function(req,res,next){
// 	console.log(1)
// 	res.header("Access-Control-Allow-Origin",'*')
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	next();
// })
app.get('/api/seller',router.showSeller);
app.get('/api/goods',router.showAllGoods);
app.get('/api/ratings',router.showRatings);

app.listen(8088)
