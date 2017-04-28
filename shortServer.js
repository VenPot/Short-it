//var http = require('http')
var express = require('express')
var path = require('path')
    //var fs = require('fs')
var qs = require('querystring')
var logger = require('morgan')
var shortDb = require('./shortDb.js')
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
        var convertedUrl = Math.random().toString(36).slice(-4)
        var x = "/" + convertedUrl
        var basePlusconvertedUrl = "https://latesthollerclone-curious2code.c9users.io" + x

        //var basePlusconvertedUrl = "https://c9surl.herokuapp.com" + x
        shortDb.saveUrl(baseUrl, x)
        res.end(basePlusconvertedUrl)
    })

})

app.get(/...../, function(req, res) {
    console.log("request Url is ", req.url, req.method)
    var mash = req.url.toString()
    shortDb.getUrl(mash, function(err, data) {
        if (err) throw err
        console.log("data is ", data)
        var x = data[0]['base'].replace('https://', 'https://www.')
        res.redirect(302, x);
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
