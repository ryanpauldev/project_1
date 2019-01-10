







//Search button sumbit function
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  console.log("YOU CLICKED ME")
  var searchInput = $("#beerInput").val().trim();
  console.log(searchInput);
});