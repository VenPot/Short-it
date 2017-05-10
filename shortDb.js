var exports = module.exports = {}
var mongoose = require('mongoose');
var uriFallback = 'mongodb://' + process.env.IP + ':27017/shortURl'
var URI = process.env.MONGODB_URI || uriFallback
mongoose.connect(URI)

var urlSchema = mongoose.Schema({
  base: String,
  newone: String
})

var urlmap = mongoose.model('urlmap', urlSchema)

exports.saveUrl = function(baseUrl, newUrl) {
  var x = new urlmap({})
  x.base = baseUrl
  x.newone = newUrl
  x.save(function(err, x) {
    if (err) console.error(err)
    else
      console.log("data inserted into database")
  })
}

exports.getUrl = function(mash, callback) {
  urlmap.findOne({
    newone: mash
  }, 'base', function(err, data) {
    if (err) callback(err)
    else
      callback(null, data)
  })
}
