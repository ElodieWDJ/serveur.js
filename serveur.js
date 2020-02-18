let http = require('http');
let url = require('url');

let server = http.createServer(function (request, response) {
     
     
    let queryObject = url.parse(request.url, true).query;
 
    if(request.method== "GET"){
        response.setHeader('Access-Control-Allow-Origin', '*');
        if (queryObject.user == 'jean') {
            response.writeHead(200, { "content-Type": "json" });
            response.write('{"user":"Jean", "role":"admin", "langue":"fr"}');
            response.end();
        }
        else {
            response.writeHead(401, { "content-type": "json" });
            response.write('{}');
            response.end();
        }
    } else  {
        response.writeHead(405, { "content-type": "json" });
        response.write('{}');
        response.end();
    }
});
server.listen(8080);