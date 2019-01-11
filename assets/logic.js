$(document).ready(function () {
  //global variables
  var resultBeers;
  var testId;

  //event listener to fire up the search and acces the API
  $("#search-button").on("click", function (event) {
    //prevent reloads
    event.preventDefault();
    //hiding the jumbotron to full display the table list-beers
    $(".jumbotron").hide();
    //clear the current content of the table
    $("#list-beers").empty();

    // get the content of the input
    var searchInput = $("#search-input").val().trim();
    console.log(searchInput);

    //trying to connect to the API in the sandbox  
    //build the query
    // example endpoint beers:::> http://api.brewerydb.com/v2/{endpoint}/?key=abcdef
    var queryURL = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?key=c0a5fceb48f0e2d48f8850e64307b88f&q=" + searchInput;

    /* Important do not touch
    var queryURL = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?key=c0a5fceb48f0e2d48f8850e64307b88f&q=guinness";
     */

    // Creates AJAX call for the specific  button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      //console.log(response);


      //if the AJAX call returns something 
      if (response.data.length && response.data.length > 0) {

        console.log(`length: ${response.data.length}`);
        //get the results as a giant resultsBeers Object
        resultBeers = response.data;
        console.log(resultBeers);

        //display the number of beers found in the card title
        $("#number-results").text(resultBeers.length);

        //get the id of the returned beers to create a second query to get specific information about the selected beer

        /*  var beerId = resultBeers[2].id.trim();
         console.log(`Beer Id:${beerId}`); */

        //for loop to create the table results content\
        for (var i = 0; i < resultBeers.length; i++) {

          //local variables to get store the data
          var id = resultBeers[i].id.trim();

          //testId
          testId = id;
          var name = resultBeers[i].name;
          var type = resultBeers[i].type;

          //inline if statement to check if established exists 
          var established = ((resultBeers[i].established) ? resultBeers[i].established : "Not available");

          //inline if statement to check if category exists
          var category = ((resultBeers[i].style) ? resultBeers[i].style.name : "Not available");

          //create a new row using jQuery and 
          var newRow = $("<tr>");
          newRow.attr("data-id", id);
          //!!!really crazy part stay with me :)
          //its gonna get really really nasty
          // Using the data method:
          newRow.data("desc", resultBeers[i].description);
          newRow.data("isOrganic", resultBeers[i].isOrganic);
          newRow.data("isRetired", resultBeers[i].isRetired);
          //inline statement to get fill the data
          newRow.data("availability", ((resultBeers[i].available) ? resultBeers[i].available.name : "Not data available")
          );

          newRow.data("availability-desc", ((resultBeers[i].available) ? resultBeers[i].available.name.description : "Not data available"));

          var rowName = $("<td>").text(name).appendTo(newRow);
          var rowType = $("<td>").text(type).appendTo(newRow);
          var rowEstablished = $("<td>").text(established).appendTo(newRow);
          var rowCategory = $("<td>").text(category).appendTo(newRow);
          //append the newRow to the table list-results
          $("#list-beers").append(newRow);
        }

        //second query moved into inside the event listener for a click on the table import  

      } else { // in case there no data available for the search input
        //display the number of beers found in the card title
        $("#number-results").text("No data available");
      }
    });

    /* Calorie Searc starts here */

    var calorieInput = $("#search-input").val().trim();
    console.log(`Calorie Input:${calorieInput}`);
    var calorieQuery = "https://trackapi.nutritionix.com/v2/search/instant?query=" + calorieInput;

    $.ajax({
      url: calorieQuery,
      method: "GET",
      headers: {
        "x-app-id": "87764d56",
        "x-app-key": "64b0113675aca1dbf6f67d9df8299556"
      }
    }).then(function (responseCalories) {
      console.log(`Calorie Object:`, responseCalories);


    });

  });

  //event listener for a click on a table tr on list-beers 
  $(document).on("click", "#list-beers tr", function () {
    //change the color of the row
    $(this).addClass("table-success");

    //get the value of the tr id
    var rowId = $(this).attr("data-id");
    alert(`this row id is: ${rowId}`);

    //remember the data method lol.
    //here is the time to call it back. Razen Sharingan!!! 
    var descValue = $(this).data("desc");
    var isOrganicValue = $(this).data("isOrganic");
    var isRetiredValue = $(this).data("isRetired");
    var availabilityValue = $(this).data("availability");
    var availabilityDescValue = $(this).data("availability-desc");

    /* DESCRIPTION */
    //NAV 1 - display the values inside the nav description
    //but first clean the current content tada...
    $("#nav-description").text("");

    //later will build some css for better render
    var divDescription = $("<div>");

    var pDescription = $('<p class="lead">').text(descValue);
    var hisOrganic = $("<h4>").text("Is organic: " + isOrganicValue);
    var hisRetired = $("<h4>").text("Is retired: " + isRetiredValue);
    var havailabilityValue = $("<h4>").text("Availability: " + availabilityValue);
    var havailabilityDescValue = $("<h4>").text("Availability : " + availabilityDescValue);

    //append everything to the div
    divDescription.append(pDescription, hisOrganic, hisRetired, havailabilityValue, havailabilityDescValue)

    //append the div to the nav description
    $("#nav-description").append(divDescription);


    /*INGREDIENTS  */
    //NAV 4  - display the values of the ingredients
    //parameters :::> beer/WHQisc/ingredients
    testId = "WHQisc"; //change later by rowId
    var queryBeer = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beer/" + testId + "/ingredients?key=c0a5fceb48f0e2d48f8850e64307b88f";
    //creates the AJAX call for the specific beerId aka rowId
    $.ajax({
      url: queryBeer,
      method: "GET"
    }).then(function (beerIngredients) {
      console.log(beerIngredients);
      if (beerIngredients.data) {
        var listIngredients = beerIngredients.data.length;
        var ingredientDiv = $("<div>");
        //for loop to create the ingredients tag
        for (var j = 0; j < listIngredients; j++) {
          console.log(`Ingredient - ${j} - ${beerIngredients.data[j].name}`);
          //create an h4 tag and append it to ingredientDiv
          var ingredientTag = $("<h5>").text(`Ingredient - ${j} - ${beerIngredients.data[j].name}`).appendTo(ingredientDiv);
        }
        //dipslay the ingredient content inside the nav-ingredients
        $("#nav-ingredients").append(ingredientDiv)
      } else {

        $("#nav-ingredients").text("No data available!");
      }
      //console.log(`length: ${response.data.length}`);
    });

    /* Calorie Search starts here */

    var calorieInput = $("#search-input").val().trim();
    console.log(calorieInput);
    var calorieQuery = "https://trackapi.nutritionix.com/v2/search/instant?query=" + calorieInput;

    $.ajax({
      url: calorieQuery,
      method: "GET",
      headers: {
        "x-app-id": "87764d56",
        "x-app-key": "64b0113675aca1dbf6f67d9df8299556"
      }
    }).then(function (responseCalories) {
      console.log("CALORIE INPUT HERE")
      console.log(responseCalories);

      //display beer calories for first result
      var beerCalorie = responseCalories.branded[0].nf_calories;
      var servingSize = responseCalories.branded[0].serving_qty + responseCalories.branded[0].serving_unit;
      console.log("calories for " + calorieInput + ": " + beerCalorie);
      console.log("serving size: " + servingSize);
      
    //empties nav nutrtion to prevent stacking information from previous searches
    $(".nutritionInfo").empty();

    // adds nutrition and serving size on nutrition 

      var calorieTag = $("<div>");
      calorieTag.addClass("nutritionInfo");
      calorieTag.html("<h4>Calories:</h4>" + beerCalorie);
      $("#nav-nutrition").append(calorieTag);

      var servingTag = $("<div>");
      servingTag.addClass("nutritionInfo");
      servingTag.html("<h4>Serving size:</h4>" + servingSize);
      $("#nav-nutrition").append(servingTag);
  
    
    });



  });
});
