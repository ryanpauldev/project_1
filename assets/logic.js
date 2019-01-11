
//Search button sumbit function
$("#searchBTN").on("click", function(event) {
  event.preventDefault();
  console.log("YOU CLICKED ME")
 
  var searchInput = $("#beerInput").val().trim();
  console.log(searchInput);
  var queryUrl = "https://trackapi.nutritionix.com/v2/search/item?" + searchInput;


  $.ajax({
    url: queryUrl,
    method: "GET",
    headers: {
      "x-app-id": "87764d56",
      "x-app-key": "64b0113675aca1dbf6f67d9df8299556"
    }
  }).then(function(response) {
    console.log(response);
  });


});