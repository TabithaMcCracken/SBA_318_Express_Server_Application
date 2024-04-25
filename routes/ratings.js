const express = require("express");
const router = express.Router();

const ratings = require("../data/ratings");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "ratings/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ ratings, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.trail && req.body.rating) {
      const rating = {
        id: ratings[ratings.length - 1].id + 1,
        userId: req.body.userId,
        trail: req.body.title,
        rating: req.body.content,
      };

      ratings.push(rating);
      res.json(ratings[ratings.length - 1]);
    } else next(error(400, "Insufficient Data"));
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
