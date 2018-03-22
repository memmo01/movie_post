var connection = require("../config/connection.js");


module.exports= function(app){

    app.get("/api/:user?",function(req,res){
        connection.query("SELECT * FROM movie_info WHERE user_id = ?",[req.params.user],function(err,results){
            res.json(results);
        })
    })

    app.post("/api/addmovie",function(req,res){
        connection.query("INSERT INTO movie_info (movie_title, genre, pic_id, director, actors, plot, boxOffice, imdb_rating, rt_rating) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)",[req.body.movie_title, req.body.genre, req.body.pic_id, req.body.director, req.body.actors, req.body.plot, req.body.boxOffice, req.body.imdb_rating, req.body.rt_rating], function(err,results){
           console.log("in")
            res.end();
        })
    })

    app.get("/api/user/:id?",function(req,res){
        connection.query("SELECT * FROM movie_info WHERE id = ?",[req.params.id],function(err,results){
            res.json(results)
        })
    })
}