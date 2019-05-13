// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div class='row center-align'><div class='col l3'></div><div class='col l6 center-align'><p data-id='" + data[i]._id + "'>" + data[i].title + "<br /><a id 'articleLink' class='waves-effect waves-teal btn-flat' href='" + data[i].link + "'>Link to the Article   </a><a id='saveBtn' class='btn-floating btn-small waves-effect waves-light red'><i class='material-icons'>save</i></a></p><div class='col l3'></div></div><br>");
    }
  });
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    // $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    console.log("You just clicked the save button");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })

      .then(function(data) {
        console.log(data);

        }
      );
  });
  
  // // When you click the savenote button
  // $(document).on("click", "#saveBtn", function() {
  //   // Grab the id associated with the article from the submit button
  //   var thisId = $(this).attr("data-id");

  //   console.log("*************************" + thisId);
  
  //   // Run a POST request to change the note, using what's entered in the inputs
  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/" + thisId,
  //     data: {
  //       // Value taken from title input
  //       title: $("#titleinput").val(),
  //       // Value taken from note textarea
  //       body: $("#bodyinput").val()
  //     }
  //   })
  //     // With that done
  //     .then(function(data) {
  //       // Log the response
  //       console.log(data);
  //       // Empty the notes section
  //       $("#notes").empty();
  //     });
  
  //   // Also, remove the values entered in the input and textarea for note entry
  //   $("#titleinput").val("");
  //   $("#bodyinput").val("");
  // });
  