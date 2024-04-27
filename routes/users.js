const express = require("express");
const router = express.Router();

const userData = require("../data/users");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.render("users", { users: userData });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (userData.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: userData.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      userData.push(user);
      res.redirect("/api/users"); 
      // res.json(userData[userData.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router.get("/:id", (req, res, next) => {
    const user = userData.find((u) => u.id == req.params.id);

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

    if (user) res.json({ user, links });
    else next();
  })


router.patch("/:id/update", (req, res, next) => {
    const user = userData.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          userData[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) {
      console.log("PATCH request successful.")
      res.json(user);
    } else {
      next();
    }
  })

router.delete("/:id/delete", (req, res, next) => {
    const user = userData.find((p, i) => {
      if (p.id == req.params.id) {
        userData.splice(i, 1);
        return true;
      }
    });

    if (user) {
      console.log("DELETE request successful.")
      res.json(user);
    }
    else {
      next();
    }
  });

  
module.exports = router;
