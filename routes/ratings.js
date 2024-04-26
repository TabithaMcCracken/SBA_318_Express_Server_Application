const express = require("express");
const router = express.Router();

const ratingsData = require("../data/ratings");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.render("ratings", {ratings: ratingsData})
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.trail && req.body.rating) {
      const newRating = {
        id: ratingsData.length + 1, // Create a new ID for the new rating
        userId: req.body.userId,
        trail: req.body.trail,
        rating: req.body.rating,
      };

      ratingsData.push(newRating); // Add the new rating to the ratingsData array
      res.redirect("/api/ratings"); // Redirect to the ratings page after adding the new rating
    } else {
      next(error(400, "Insufficient Data")); // Handle insufficient data error
    }
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const rating = ratings.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (rating) res.json({ rating, links });
    else next();
  })
  .patch((req, res, next) => {
    const rating = ratings.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          ratings[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (rating) res.json(rating);
    else next();
  })
  .delete((req, res, next) => {
    const rating = ratings.find((p, i) => {
      if (p.id == req.params.id) {
        ratings.splice(i, 1);
        return true;
      }
    });

    if (rating) res.json(rating);
    else next();
  });

module.exports = router;
