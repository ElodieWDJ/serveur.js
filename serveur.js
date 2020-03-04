let http = require('http');
let url = require('url');

let server = http.createServer(
	function (request, response) {

		let queryObject = url.parse(request.url, true).query;

		if (request.method == "GET") {
			response.setHeader('Access-Control-Allow-Origin', '*');
			console.log("get");
			console.log(queryObject.user);
			console.log(queryObject.password);
			signInUser(queryObject.user, queryObject.password).then(b => gere(response, b, queryObject.user)).catch(err => echec(response))

		} else {
			console.log("tu n'es pas get");
			response.writeHead(405, { "content-type": "json" });
			response.write('{}');
			response.end();
		}
	}

);

function gere(response, b, user) {
	if (b) {
		reussite(response, user);
	} else {
		echec(response);
	}
}


function reussite(response, user) {
	console.log("---- 200")
	response.writeHead(200, { "content-Type": "json" });
	response.write('{"token":"","user":"' + user + '", "role":"", "langue":""}');
	response.end();
}
function echec(response) {
	console.log("---- 401");
	response.writeHead(401, { "content-type": "json" });
	response.write('{}');
	response.end();
}


// sign user method
function signInUser(mail_value, password_value) {


	//Connexion à la base de données
	const mysql = require('mysql')
	const connexion = mysql.createConnection({
		host: 'localhost',
		database: 'nodejs',
		user: 'root',
		password: ''
	})
	let sql = "SELECT * FROM users WHERE mail  = ? AND password = ?";
	let inserts = [mail_value, password_value];
	sql = mysql.format(sql, inserts);

	return new Promise((resolve) => {
		connexion.query(sql, function (error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				console.log("FIND!!!!")
				console.log(results[0]);
				resolve(true);

			} else {
				console.log("vide");
				resolve(false);
			}
		});
	});


};

server.listen(8080);