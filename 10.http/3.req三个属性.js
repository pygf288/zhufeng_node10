var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req,res) {
    console.log(req.url);//请求路径
    console.log(req.method);//请求方法
    console.log(req.headers);//请求头
    //如果默认访问http://localhost:8080 相当于/
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type',"text/html;charset=utf8");
        fs.createReadStream('./index.html').pipe(res);
    }else{ //  ./index.js   mime 类型对照表（第三方）
        //在设置之前要先判断文件是否存在 不存在 404
        fs.exists('.'+pathname,function (exists) {
            if(exists){
                res.setHeader('Content-Type',require('mime').lookup(pathname)+";charset=utf8");
                fs.createReadStream('.'+pathname).pipe(res);
            }else{
                res.statusCode = 404;
                res.end();
            }
        });
    }
}).listen(8080);