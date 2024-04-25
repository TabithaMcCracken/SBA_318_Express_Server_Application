const express = require("express");
const router = express.Router();

const trailsData = require("../data/trails");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
      res.render("trails", { trails: trailsData});
    })
  .post((req, res, next) => {
    if (req.body.userId && req.body.trail && req.body.rating && req.body.description) {
      const trail = {
        id: trailsData[trailsData.length - 1].id + 1,
        userId: req.body.userId,
        trail: req.body.trail,
        rating: req.body.rating,
        description: req.body.description
      };

      trails.push(trail);
      res.json(trails[trails.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const trail = trails.find((p) => p.id == req.params.id);

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

    if (trail) res.json({ trail, links });
    else next();
  })
  .patch((req, res, next) => {
    const trail = trails.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          trails[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (trail) res.json(trail);
    else next();
  })
  .delete((req, res, next) => {
    const trail = trails.find((p, i) => {
      if (p.id == req.params.id) {
        trails.splice(i, 1);
        return true;
      }
    });

    if (trail) res.json(trail);
    else next();
  });

module.exports = router;
