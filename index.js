// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const error = require("./utilities/error");

// Files
const users = require("./routes/users");
const trails = require("./routes/trails");
const ratings = require("./routes/ratings");

// Create Express app
const app = express();
const port = 3000;

// Setup EJS template engine
app.set("view engine", "ejs");

// Access static file
app.use(express.static(__dirname + '/styles'))

// Middleware for Parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Middleware for Logging Time Stamp and Request info
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// 3 Routes
app.use("/api/users", addHateoasLinks(users));
// app.use("/api/users", users);
app.use("/api/trails", addHateoasLinks(trails));
app.use("/api/ratings", addHateoasLinks(ratings));

// Sets route handler for the root URL("/")
app.get("/", (req, res) => {
  res.render("index", { title: "Hiking Trails Page" });
});


// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Middleware for Error-handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Function to add HATEOAS links to routes
function addHateoasLinks(router) {
  router.use((req, res, next) => {
    res.hateoas = (links) => {
      res.json({ ...links, data: res.locals.data });
    };
    next();
  });
  return router;
}

//Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
