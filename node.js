const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer(function(){}).listen(80,function(){
    console.log('正在监听：80端口');
});
server.on('request', function (request, response) {
    var requestUrl = request.url;
    var pathName =  decodeURI(url.parse(requestUrl).pathname);
    var filePath = path.resolve(__dirname + pathName);
    response.writeHead(200, {});
    fs.stat(filePath,(err,stats)=>{
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
            return;
        }
        if(stats.isFile()){
            fs.readFile(filePath,(err,file)=>{
                if(err){
                    console.log(err);
                }
                response.end(file);
            });
            return;
        }
        if(stats.isDirectory()){
            fs.readFile(`${filePath}/index.html`,(err,file)=>{
                if(err){
                    console.log(err);
                }
                response.end(file);
            });
        }
    });
});


