module.exports = exports = {}
var shortDb = require('./shortDb.js')
var basePlusconvertedUrl
exports.getNewUrl = function(baseUrl, host, callback) {
    var x = "/" + exports.convertedUrl()
    generateNewUrl(x)

    function generateNewUrl(x) {

        if (exports.check(x)) {
            basePlusconvertedUrl = "https://" + host.toString() + x

            if (typeof(baseUrl) == 'string') {
                shortDb.saveUrl(baseUrl, x)
                callback(null, basePlusconvertedUrl)
            }
            else
                callback("not a string")
        }
    }
}
exports.convertedUrl = function() {
    return Math.random().toString(36).slice(-4)
}

exports.regenerate = function(x) {
    x = "/" + exports.convertedUrl()
    exports.getNewUrl.generateNewUrl(x)
}

exports.check = function(x) {
    var y
    shortDb.getUrl(x, function(err, data) {
        if (err) throw err
        console.log("data is " + data)
        y = data


    })

    if (y) {
        exports.regenerate(x)
        return false
    }
    else return true
}
