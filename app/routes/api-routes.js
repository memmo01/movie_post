var connection = require("../config/connection.js");


module.exports = function(app) {

    app.get("/api/:user?", function(req, res) {
        connection.query("SELECT * FROM movie_info WHERE user_id = ?", [req.params.user], function(err, results) {
            res.json(results);
        })
    })

    app.post("/api/addmovie", function(req, res) {
        connection.query("INSERT INTO movie_info (user_id, movie_title, genre, pic_id, director, actors, plot, boxOffice, imdb_rating, rt_rating) VALUES (?, ? , ? , ? , ? , ? , ? , ? , ? , ?)", [req.body.user_id, req.body.movie_title, req.body.genre, req.body.pic_id, req.body.director, req.body.actors, req.body.plot, req.body.boxOffice, req.body.imdb_rating, req.body.rt_rating], function(err, results) {

            res.end();
        })
    })
    app.post("/api/newuser/", function(req, res) {
        connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, req.body.password], function(err, results) {

            res.end();
        })
    })

    app.get("/api/user/:id?", function(req, res) {
        connection.query("SELECT * FROM movie_info WHERE id = ?", [req.params.id], function(err, results) {
            res.json(results)
        })
    })
    app.get("/api/findNewUser/:user?/:password?", function(req, res) {
        connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [req.params.user, req.params.password], function(err, results) {
            res.json(results);
        })
    })

    app.get("/api/loggin/:username?/:password?", function(req, res) {

        connection.query("SELECT users.email, users.user_id, movie_info.id, movie_info.movie_title, movie_info.genre, movie_info.director, movie_info.pic_id, movie_info.actors, movie_info.plot, movie_info.boxOffice,movie_info.imdb_rating, movie_info.rt_rating FROM users INNER JOIN movie_info ON (users.user_id = movie_info.user_id) WHERE email = ? AND password = ?", [req.params.username, req.params.password], function(err, results) {
            res.json(results);
        })
    })


    app.post("/api/deleteMovie/", function(req, res) {
        connection.query("DELETE FROM movie_info WHERE id = ? AND user_id = ?", [req.body.id, req.body.user_id], function(err, results) {
            console.log("deleted");
            res.end();
        })
    })
}