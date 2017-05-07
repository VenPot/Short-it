//var http = require('http')
var express = require('express')
var path = require('path')
    //var fs = require('fs')
var qs = require('querystring')
var logger = require('morgan')
var shortDb = require('./shortDb.js')
var gnu = require('./generateNewUrl.js')
var parsedBody = ''
var filename
var counter = 0
var app = express()
app.use(logger())

app.use(express.static(path.join(__dirname, 'Public', 'HTML')))
app.use(express.static(path.join(__dirname, 'Public', 'CSS')))
app.use(express.static(path.join(__dirname, 'Public', 'JS')))



app.all('*', function(req, res, next) {
    counter++
    console.log("req.url is ", req.url, req.method, counter)
    next()
})

app.post('/sends', function(req, res) {
    console.log("req.url is ", req.url, req.method)
    var body = ''
    req.on('data', function(data) {
        body = body + data
    })

    req.on('end', function() {
        parsedBody = qs.parse(body)
        var baseUrl = parsedBody.clientUrl
        gnu.getNewUrl(baseUrl, function(err, data) {
            if (err) console.log(err)
            else res.end(data)
        })
    })

})

app.get(/...../, function(req, res) {
    console.log("request Url is ", req.url, req.method)
    var mash = req.url.toString()
    shortDb.getUrl(mash, function(err, data) {
        console.log("data is ", data)
        if (err) {
            console.log(err)
            res.end()
        }
        else {

            var x = data[0]['base'].replace('https://', 'https://www.')
            res.redirect(302, x);
        }

    })

})

app.listen(process.env.PORT || 5000, function() {
    console.log("server is listening")
})




/*
console.log("in send")
            res.writeHead(302, {
                Location: 'https://teamtreehouse.com/'
            })
            res.end()
*/
