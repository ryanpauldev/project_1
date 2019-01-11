$(document).ready(function () {

  //global variables
  var resultBeers;
  //trying to connect to the API in the sandbox  
  //build the query
  var search = "beers";
  //http://api.brewerydb.com/v2/{endpoint}/?key=abcdef
  var queryURL = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?key=c0a5fceb48f0e2d48f8850e64307b88f&q=guinness";
  //;


  // Creates AJAX call for the specific  button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //console.log(response);
    console.log(`length: ${response.data.length}`);
    //if the AJAX call returns anything 
    if (response.data.length > 0) {
      //get the results as a giant resultsBeers Object
      resultBeers = response.data;
      console.log(resultBeers);

      //display the number of beers found in the card title
      $("#number-results").text(resultBeers.length);

      //get the id of the returned beers to create a second query to get specific information about the selected beer
      //later will use a loop to create the table to display all the content
      var beerId = resultBeers[2].id.trim();
      console.log(`Beer Id:${beerId}`);

      //for loop to create the table results content\
      for (var i = 0; i < resultBeers.length; i++) {

        //local variables to get store the data
        var id = resultBeers[i].id.trim();
        var name = resultBeers[i].name;
        //if established exists 
        if (resultBeers[i].established) {
          var established = resultBeers[i].established;
        } else {
          var established = "Not available";
        }

        //if category exists
        if (resultBeers[i].style) {
          var category = resultBeers[i].style.name;
        } else {
          var category = "Not Available";
        }

        var type = resultBeers[i].type;

        //create a new row using Jquery
        var newRow = $("<tr>");

        var rowName = $("<td>").text(name).appendTo(newRow);
        var rowType = $("<td>").text(type).appendTo(newRow);
        var rowEstablished = $("<td>").text(established).appendTo(newRow);
        var rowCategory = $("<td>").text(category).appendTo(newRow);

        //append the newRow to the table list-results
        $("#list-beers").append(newRow);
      }

      //second query
      //parameters
      ///beer/WHQisc/ingredients
      var sSearc;
      var queryBeer = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beer/" + beerId + "/ingredients?key=c0a5fceb48f0e2d48f8850e64307b88f";
      //creates the AJAX call for the specific
      $.ajax({
        url: queryBeer,
        method: "GET"
      }).then(function (beerIngredients) {
        console.log(beerIngredients);
        //console.log(`length: ${response.data.length}`);

      });
    } else {
      //display the number of beers found in the card title
      $("#number-results").text("No data available");

    }
    // var results = response.data;
  });


  //Search button sumbit function
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    console.log("YOU CLICKED ME")
    var searchInput = $("#beerInput").val().trim();
    console.log(searchInput);

  });

});