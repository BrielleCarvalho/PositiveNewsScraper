var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var port = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true } );


// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.goodnewsnetwork.org/category/news/usa/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h3 within a div tag, and do the following:
        $("div h3").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbStory) {
                    // View the added result in the console
                    console.log(dbStory);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Go back to our home page to view the newest articles!");
    }).then(function(result){
        result.redirect("http://localhost:3000/")
    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
        .then(function (dbStory) {
            res.send(dbStory);
        })
        .catch(function (err) {
            console.Console.log(err)
        });
});

// Route for grabbing a specific Article by id
app.get("/articles/:id", function (req, res) {
    // TODO
    // ====
    // Populate the Notes with article you "saved"
    db.Note.create(res)
        .then(function(saved){
            console.log("*******this is the SAVED variable: " + saved)
        })
        .catch(function(err){
            console.log("*** This is an ERROR: " + err)
        });

});

app.get("/saved", function(req, res){
    db.Note.find({})
    .then(function(saves){
        res.send(saves)
    })
    .catch(function(err){
        console.log(err)
    })
})


// Start the server
app.listen(port, function () {
    console.log("App running on port " + port + "!");
});
