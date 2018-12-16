
// Initial array of names.
var namesLOTR = ["Samwise Gamgee", "Frodo Baggins", "Gandalf"] ;


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
        nameB.addClass("nameButton btn btn-light")

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
            
            // Creating a card to hold each these 10 gifs.
            var resultsDiv = $("<div>");
            resultsDiv.addClass("card");

            // Creating a paragraph element to hold the rating.
            var pR = $("<p>")
            pR.attr("card-text");
            pR.text("Rating: " + results[j].rating);

            // Creating an image element to hold each gif, then apply still and animated attributes, and applying still gif to image.
            var resultsGif = $("<img>");
            resultsGif.attr("data-still", results[j].images.fixed_width_still.url);
            resultsGif.attr("data-animated", results[j].images.fixed_width.url);
            resultsGif.attr("data-state", "still");
            resultsGif.attr("src", results[j].images.fixed_width_still.url);
            resultsGif.addClass("card-img-top gif");

            // Prepending rating and results gif to each gif div
            resultsDiv.append(pR);
            resultsDiv.append(resultsGif);

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
    $(document).on("click", "#button-addon2", function(event) {
        event.preventDefault();
        console.log("addName Button was clicked");

        // Creates a variable from the submitted text.
        var nameQ = $("#nameInput").val();

        // Pushes the name into the name array.
        namesLOTR.push(nameQ);
        console.log(namesLOTR);

        buttonsWrite();
    })

    // Play/Pause click listener.
    $(document).on("click", ".gif", function() {
        
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }

    });

    // Writing initial buttons
    buttonsWrite();
});