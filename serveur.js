let http = require('http');
let url = require('url');

let server = http.createServer(function (request, response) {


  let queryObject = url.parse(request.url, true).query;

  if (request.method == "GET") {
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log("get");
    if (signInUser(queryObject.user, queryObject.password)) {
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
  } else {
    console.log("tu n'es pas get");
    response.writeHead(405, { "content-type": "json" });
    response.write('{}');
    response.end();
  }
});

//Connexion à la base de données
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  database: 'nodejs',
  user: 'root',
  password: ''
})

// sign user method
function signInUser(user_value, password_value) {
  // if (user_value == 'jean.jean@jean.com' && password_value == 'jean') {
  //   return true;
  // } else {
  //   return false
  // }
  db.connect((err) => {
    if (err)
      return (err.message)
    else {
      let  sql  = "SELECT * FROM users WHERE user  = ? AND password = ?"; 
      let  inserts  = [ user_value ,  password_value ] ;  
      sql  = mysql.format ( sql ,  inserts ) ; 
      db.query(sql, (err, result) => {//fonction de callback par rapport à notre requête
        if (user_value == password_value)
          return true;
        else(err)
          return false;
      }

      )
    };
  })
};
// db connexion

// select dans la table user (user et password)

// si ça existe
// return true
// sinon
// rturn false

//   return new Promise(
//     (resolve, reject) => {
//       mysql.db.signInWithEmailAndPassword(mail_value, password_value).then(
//         () => {
//           resolve();
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     }
//   );


// db.connect((err) =>{
//     if (err)
//         console.log(err.message)
//     else{
//         console.log('Connected')

//         db.query('SELECT * FROM users WHERE user_value == mail_value AND password ==password_value',(err, result)=>{//fonction de callback par rapport à notre requête
//             if (err)
//                 console.log(err.message)
//             else
//                 console.log(result)
//         })


//     }
// })




server.listen(8080);