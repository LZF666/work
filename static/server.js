var http = require('http')
var fs = require('fs')  //启用读写文件模块
var url = require('url')
var path = require('path') //防止不同系统路径不统一的情况出现

http.createServer(function(req, res){

  var pathObj = url.parse(req.url, true)

  switch (pathObj.pathname) {
    case '/work/static/server.js':

      var curIdx = pathObj.query.idx
      var len = pathObj.query.len
      var data = []

      for(var i = 0; i < len; i++) {
        data.push('内容' + (parseInt(curIdx) + i))
      }
      res.end(JSON.stringify(data))
          
      break;

    default:
     fs.readFile(path.join(__dirname ,'static', pathObj.pathname), function(err, data){
      if(err){
        res.statusCode = 404
        res.end('Not found')
      }else{
        res.end(data)
      }
     })
      
  }
}).listen(8080)
