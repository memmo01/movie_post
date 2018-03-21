var connection = require("../config/connection.js");


module.exports= function(app){

    app.get("/api/allmovies",function(req,res){
        connection.query("SELECT * FROM movies",function(err,results){
            res.json(results);
        })
    })
}