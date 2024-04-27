const express = require("express");
const router = express.Router();

const trailsData = require("../data/trails");
const error = require("../utilities/error");

// Allows the client access the trails data and to add trails
router
  .route("/")
  .get((req, res) => {
      res.render("trails", { trails: trailsData});
    })
  .post((req, res, next) => {
    if (req.body.userId && req.body.trail && req.body.rating && req.body.description) {
      const newTrail = {
        id: trailsData[trailsData.length - 1].id + 1,
        userId: req.body.userId,
        trail: req.body.trail,
        rating: req.body.rating,
        description: req.body.description
      };

      trailsData.push(newTrail);
      res.redirect("/api/trails")
      console.log("POST request successful.")
    } else next(error(400, "Insufficient Data"));
  });

  // Allows the client to accesss trail information by id
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

// Allows the client to update trail information by id
router.patch("/:id/update", (req, res, next) => {
    const trail = trailsData.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          trailsData[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (trail) {
      console.log("PATCH request successful.")
      res.json(trail);
    } else {
      next();
    }
  })
  
// Allows the client to delete trail information by id
router.delete("/:id/delete", (req, res, next) => {
    const trail = trailsData.find((p, i) => {
      if (p.id == req.params.id) {
        trailsData.splice(i, 1);
        return true;
      }
    });

    if (trail) {
      console.log("DELETE request successful.")
      res.json(trail);
    }
    else {
      next();
    }
  });

module.exports = router;
