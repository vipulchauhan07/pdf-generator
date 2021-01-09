var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "14060346",
  database: "anubudh_utils"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});