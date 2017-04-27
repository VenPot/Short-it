var exports = module.exports = {}
var mongo = require('mongodb').MongoClient



exports.saveUrl = function(baseUrl, newUrl) {
  mongo.connect('mongodb://' + process.env.IP + ':27017/shortURl', function(err, db) {
    if (err) console.log(err)
    var shortit = db.collection('shortit')
    shortit.insert({
      base: baseUrl,
      newone: newUrl
    }, function(err, data) {
      if (err) console.log("error in ():saveURL", err)
    })
    db.close()
  })

}


exports.getUrl = function(mash, callback) {
  mongo.connect('mongodb://' + process.env.IP + ':27017/shortURl', function(err, db) {
    if (err) console.log(err)
    var shortit = db.collection('shortit')
    shortit.find({
      newone: mash
    }, {
      _id: 0,
      newone: 0
    }).toArray(function(err, docs) {
      if (err) console.log("error in ():getUrl", err)

      db.close()
      callback(null, docs)
    })
  })
}
