
// Initial array of names.
var namesLOTR = ["Samwise Gamgee", "Frodo Baggins", "Gandalf"] 


// Functions ===============================================================

// Function to create and append buttons.
function buttonsWrite() {

    // Emptying existing content
    $("#giphyButtonArea").empty();

    // For loop to run through namesLOTR array and create a button for each.
    for (i = 0; i < namesLOTR.length; i++) {

        // Creation of button element.
        var nameB = $("<button>");

        // Adding a class to the button.
        nameB.addClass("nameButton")

        // Adding attributes to the button.
        nameB.attr("data-name", namesLOTR[i]);

        // Adding text for button.
        nameB.text(namesLOTR[i]);

        // Adding button to the giphy button div.
        $("#giphyButtonArea").append(nameB);
    }

    // Logging current namesLOTR array to the log
    console.log(namesLOTR);

}

// Function to read and retrieve giphy gifs.
function displayNameGifs() {
    
    // Setting movie and query variables.
    var nameA = $(this).attr("data-name");
    console.log(nameA);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nameA + "&api_key=32ehJXIzBZLqTLngAlqIck2lcEK2d6Nq&limit=10";

    // AJAX call for button that was pressed.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // Setting response data as a variable.
        var results = response.data;

        // For loop to create each gif.
        for (j = 0; j < results.length; j++) {
            
            // Creating a div to hold each these 10 gifs.
            var resultsDiv = $("<div>");

            // Creating a paragraph element to hold the rating.
            var pR = $("<p>").text("Rating: " + results[j].rating);

            // Creating an image element to hold each gif and adding its url to the src.
            var resultsGif = $("<img>");
            resultsGif.attr("src", results[j].images.fixed_height.url);

            // Prepending rating and results gif to each gif div
            resultsDiv.prepend(pR);
            resultsDiv.prepend(resultsGif);

            // Prepending to existing div.
            $("#giphyPlacementArea").prepend(resultsDiv);

        }

    });

}

// Page Processes ===============================================================

// Function to wait to run anything until page loads.
$(document).ready(function(){

    // Applying listener for all nameButton.
    $(document).on("click", ".nameButton", displayNameGifs);

    // Click listene function to add movies from user input after add name is pushed.
    $("#addName").on("click", function(event) {
        event.preventDefault();

        // Creates a variable from the submitted text.
        var nameQ = $("#nameInput").val();

        // Pushes the name into the name array.
        namesLOTR.push(nameQ);
        console.log(namesLOTR);

        buttonsWrite();
    })


    // Writing initial buttons
    buttonsWrite();
});