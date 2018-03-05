var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

http.createServer(function (req, res) {
    var pathObj = url.parse(req.url, true)

    switch (pathObj.pathname) {
        case '/getNews':
            var news = [
                "11日羽毛球比赛夺冠",
                "男子足球未出小组赛",
                "13日排球比赛对战巴西"
            ]
            res.setHeader('Content-type', 'text/json;charset=utf-8')

            if (pathObj.query.callback) {
                res.end(pathObj.query.callback + '(' + JSON.stringify(news) + ')')

            } else {
                res.end(JSON.stringify(news))
            }
            break;

        default:
            fs.readFile(path.join(__dirname, 'static', pathObj.pathname), function (err, data) {
                if (err) {
                    res.statusCode = 404
                    res.end('Not found')
                } else {
                    res.end(data)
                }
            })

    }
}).listen(8080)
