// the program starts with an api call to the database to load all of the user's favorite movies
// i will soon add code to recognize individual users loading specific movies they chose as favorite
var user = 1;
$.get("/api/"+user,function(datas){
	console.log(datas);
	displayUsserFavorite(datas);
})


// here the information is taken from the database, sorted, and displayed on the main screen
// when these are clicked, it will activate a modal to display mroe information about the movie
function displayUsserFavorite(data){
	for(i=0;i<data.length;i++){
		var list = "<div class='card'><div class='card-body'>";
			list+="<a href='#' style='text-decoration:none; color:black' data-toggle='modal' data-target='#exampleModal' <div class='row movieInfo' data-id="+data[i].id+"><div class='col-lg-3'><img src="+data[i].pic_id+" id='mainPagePoster'></div><div class='col'><div class='jumbotron ' id='fav-title'><h1 class='display-4'>"+data[i].movie_title+"</div></div></div></div></div>";

			$(".fav-movie-list").append(list)
	}
	
	
	// after being clicked the class held data stating which movie in the database was clicked. it uses that number to retrieve the rest of the movie  information coming back as an object labeled mData
	$(".movieInfo").on("click",function(e){
		e.preventDefault();
		
		$(".modal-search-results").empty()
		var id= ($(this).data("id"))
		$.get("/api/user/"+ id, function(mData){
		
	

			
// we take the mData object and use parts of it to display pieces of it in different areas of the modal
	var titles = "<h1>" + mData[0].movie_title + "</h1>";
	$("#exampleModalTitle").html(titles)

	var movieSearchs = "<br><div class='row'><div class='col'></div><div class='col'>";
	movieSearchs += "<img src=" + mData[0].pic_id + "></div><div class='col'></div></div><br><br><h5 class='card-title'>";
	// movieSearchs += "Released: </h5> <p class='card-text'></p>";
	movieSearchs += "<br><h5 class='card-title'>Genre: </h5><p class='card-text'>" + mData[0].genre + "</p>";
	movieSearchs += "<br><h5 class='card-title'> Director: </h5><p class='card-text'>" + mData[0].director + "</p><br>";
	movieSearchs += "<h5 class='card-title'>Actors: </h5><p class='card-text'>" + mData[0].actors + "</p><br><h5 class='card-title'>";
	movieSearchs += "Plot: </h5><p class='card-text'>" + mData[0].plot + "</p>";
	movieSearchs += "<h5 class='card-title'>Box Office: </h5><p class='card-text'>" + mData[0].boxOffice + "</p><br>";
	movieSearchs += "<h5 class='card-title'>Ratings: </h5><p class='card-text'>IMDB: " + mData[0].imdb_rating + "</p>";
	movieSearchs += "<p class='card-text'>Rotten Tomatoes: " + mData[0].rt_rating + "</p><br>"


	$(".modal-body").html(movieSearchs);
	})
})
	
}







// when search movie is selected it runs the search modal function which will open a modal and display an input where a  movie name is placed.
function searchModal() {

        $("#exampleModalTitle").html("Movie Search")
        
		var movieSearch = "<form><div class='form-group'><label for='formGroupExampleInput'>Search for movie</label>";
		movieSearch += "<input type='text' class='form-control' id='movieSearch' placeholder='Enter movie title'></div><button type='button' class='btn btn-primary movieSearchButton'>search</button></form>";

		$(".modal-body").html(movieSearch);
    
        



        // when the button is selected to search for movie palced intot he input it takes the value and places it into 
        // an ajax call to the api used. that information returns int he form of an object and can be used to display or save information.
	$(".movieSearchButton").on("click", function () {
		$(".modal-search-results").empty();


		var movieValue = $("#movieSearch").val().trim()

		if (movieValue == "") {
		} else {
			searchMovieApi(movieValue);
		}
	})
}

function searchMovieApi(movie) {

	$.ajax({
		url: "http://www.omdbapi.com/?i=tt3896198&apikey=289af123&s=" + movie,
		method: "GET"
	}).done(function (response) {
		console.log(response.Search);

		for (i = 0; i < response.Search.length; i++) {
			var list = "<div class='row'><div class='col'></div><div class='col'><img src=" + response.Search[i].Poster + " style='height:200px' 'width:200px'></div><div class='col'></div></div><div class='row'> <div class='col'></div><div class='col-lg-2'>" + response.Search[i].Year + "</div><div class='col'></div></div><div class='row'><div class='col'></div><div class='col-lg-9'> <button class='btn btn-primary btn-lg btn-block moreInfo' data-imdb=" + response.Search[i].imdbID + "  data-info=" + i + ">" + response.Search[i].Title + "</button></div><div class='col'></div></div><br><br>";

			$(".modal-search-results").append(list);
		}


		$(".moreInfo").on("click", function () {
			var x = $(this).data("imdb");
			var id = $(this).data("info");
			var pic = response.Search[id].Poster;

			$.ajax({
				url: "http://www.omdbapi.com/?i=" + x + "&apikey=289af123",
				method: "GET"
			}).done(function (response) {
				populateInfo(response, pic, id, x);

			})
		})
	});

}


// the information taken from the API is broken down here and placed into html format and displayed on the modal loaded
function populateInfo(data, pic, id) {
	$(".modal-search-results").empty()

	var title = "<h1>" + data.Title + "</h1>";
	$("#exampleModalTitle").html(title)


	var movieSearch = "<button type='button' class='btn btn-secondary btn-lg btn-block addFavorite'>";
	movieSearch += "Add to Favorites</button><br><div class='row'><div class='col'></div><div class='col'>";
	movieSearch += "<img src=" + pic + "></div><div class='col'></div></div><br><br><h5 class='card-title'>";
	movieSearch += "Released: </h5> <p class='card-text'>" + data.Released + "</p>";
	movieSearch += "<br><h5 class='card-title'>Genre: </h5><p class='card-text'>" + data.Genre + "</p>";
	movieSearch += "<br><h5 class='card-title'> Director: </h5><p class='card-text'>" + data.Director + "</p><br>";
	movieSearch += "<h5 class='card-title'>Actors: </h5><p class='card-text'>" + data.Actors + "</p><br><h5 class='card-title'>";
	movieSearch += "Plot: </h5><p class='card-text'>" + data.Plot + "</p>";
	movieSearch += "<h5 class='card-title'>Box Office: </h5><p class='card-text'>" + data.BoxOffice + "</p><br>";
	movieSearch += "<h5 class='card-title'>Ratings: </h5><p class='card-text'>IMDB: " + data.imdbRating + "</p>";
	movieSearch += "<p class='card-text'>Rotten Tomatoes: " + data.Ratings[1].Value + "</p><br>"


	$(".modal-body").html(movieSearch);


	$(".addFavorite").on("click", function () {
		$(".addFavorite").css("display", "none");
		console.log("adding fav")
		var rt = data.Ratings[1].Value
		addToFavorites(data, pic, rt)
	})

}


function addToFavorites(data, pic, rt) {

	var favData = {
		movie_title: data.Title,
		genre: data.Genre,
		pic_id: pic,
		director: data.Director,
		actors: data.Actors,
		plot: data.Plot,
		boxOffice: data.BoxOffice,
		imdb_rating: data.imdbRating,
		rt_rating: rt
	}


	console.log(favData);

	$.post("/api/addmovie", favData, function (req, res) {

	})
}
