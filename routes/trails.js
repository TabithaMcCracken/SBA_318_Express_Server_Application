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

      trailsData.push(trail);
      res.json(trailsData[trailsData.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const trail = trailsData.find((p) => p.id == req.params.id);

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

router.patch("/:id/update", (req, res, next) => {
  const trailIndex = trailsData.findIndex((p)=>p.id == req.params.id);
  if (trailIndex !== -1) {
    const updatedTrail = { ...trailsData[trailIndex], ...req.body };
    trailsData[trailIndex] = updatedTrail;
    res.json(updatedTrail);
  } else {
    next(error(404, "Trail not found"));
  }
});


module.exports = router;
