var mongoose = require ('mongoose')

var db =  mongoose.createConnection('mongodb://127.0.0.1:27017/eleme')

db.once('open', function (callback) {
    console.log("数据库成功连接")
})

module.exports = db