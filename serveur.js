let http = require('http');
let url = require('url');

let server = http.createServer(function (request, response) {
     
     
    let queryObject = url.parse(request.url, true).query;
 
    if(request.method== "GET"){
        response.setHeader('Access-Control-Allow-Origin', '*');
        console.log("get");
        if (queryObject.user == 'jean.jean@jean.com' && queryObject.password == 'jean') {
            console.log("---- 200")
            response.writeHead(200, { "content-Type": "json" });
            response.write('{"token":"01","user":"Jean", "role":"admin", "langue":"fr"}');
            response.end();
        }

        else {
            console.log("---- 401");
            response.writeHead(401, { "content-type": "json" });
            response.write('{}');
            response.end();
        }
    } else  {
        console.log("tu n'es pas get");
        response.writeHead(405, { "content-type": "json" });
        response.write('{}');
        response.end();
    }
});
server.listen(8080);