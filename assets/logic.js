$(document).ready(function () {
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
    console.log(response);
    console.log(`length: ${response.data.length}`);
    if (response.data.length > 0) {
      //get the id of the returned beers to create a second query to get specific information about the selected beer
      //later will use a loop to create the table to display all the content
      var beerId = response.data[2].id.trim();
      console.log(`Beer Id:${beerId}`);

      //second query
      //parameters
      ///beer/WHQisc/ingredients
      var sSearc;
      var queryBeer = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beer/"+beerId+"/ingredients?key=c0a5fceb48f0e2d48f8850e64307b88f";
      //creates the AJAX call for the specific
      $.ajax({
        url: queryBeer,
        method: "GET"
      }).then(function (beerIngredients) {
        console.log(beerIngredients);
        //console.log(`length: ${response.data.length}`);

      });




    }


    // var results = response.data;
  });
});