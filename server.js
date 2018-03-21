var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var Port = process.env.Port || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));


app.use(express.static("./app/public"));





require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

app.listen(Port,function(){
    console.log("connected on port "+ Port);
})