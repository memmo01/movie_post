var mysql = require("mysql");


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'',
    port:3306
});


connection.connect(function(err){
    if(err) throw err;
    console.log("connection on "+ connection.threadId);
})

module.exports= connection;