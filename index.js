console.log('Hello World')
// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const trails = require("./routes/trails");
const ratings = require("./routes/ratings");
const error = require("./utilities/error");

// Create Express app
const app = express();
const port = 3000;

// Setup EJS template engine
app.set("view engine", "ejs");

// Middleware for Parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Middleware for Logging
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

// Routes
app.use("/api/users", users);
app.use("/api/trails", trails);
app.use("/api/ratings", ratings);

// Sets route handler for the root URL("/")
app.get("/", (req, res) => {
  res.render("index", { title: "Hiking Trails Page" });
});

// HATEOAS links
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

// HATEOAS links
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/trails",
        rel: "trails",
        type: "GET",
      },
      {
        href: "api/trails",
        rel: "trails",
        type: "POST",
      },
    ],
  });
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

//Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
