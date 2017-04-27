var http = require('http')
var path = require('path')
var fs = require('fs')
var qs = require('querystring')
var shortDb = require('./shortDb.js')
var parsedBody = ''
var filename = ''

var server = http.createServer(function(req, res) {
    console.log("req.url is ", req.url)
    switch (req.url) {
        case '/':
            filename = path.join(__dirname, 'index.html')
            console.log(filename)

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            fs.createReadStream(filename, 'utf8').pipe(res)

            /* res.writeHead(302, {
                 Location: 'https://teamtreehouse.com/'
             })
             res.end()*/
            break
        case '/shortClient.js':
            filename = path.join(__dirname, '/shortClient.js')

            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            })
            fs.createReadStream(filename, 'utf8').pipe(res)
            break

        case '/favicon.ico':
            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
            res.end()
            break

        case '/send':
            var body = ''
            req.on('data', function(data) {
                body = body + data

            })

            req.on('end', function() {
                parsedBody = qs.parse(body)
                var baseUrl = parsedBody.clientUrl
                var convertedUrl = Math.random().toString(36).slice(-4)
                var x = "/" + convertedUrl
                var basePlusconvertedUrl = "https://c9surl.herokuapp.com" + x
                shortDb.saveUrl(baseUrl, x)
                res.end(basePlusconvertedUrl)
            })
            break
        default:
            console.log("request Url is ", req.url)
            var mash = req.url.toString()
            console.log(mash, typeof(mash))
            shortDb.getUrl(mash, function(err, data) {

                if (err) throw err
                console.log("data is ", data)
                var x = data[0]['base'].replace('https://', 'https://www.')
                res.writeHead(302, {
                    Location: x
                })
                res.end()
            })


    }
})
server.listen(process.env.PORT || 5000, function() {
    console.log("server is listening")
})




/*
console.log("in send")
            res.writeHead(302, {
                Location: 'https://teamtreehouse.com/'
            })
            res.end()
*/
