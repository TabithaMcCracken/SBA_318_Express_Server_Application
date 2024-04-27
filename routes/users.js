const express = require("express");
const router = express.Router();

const userData = require("../data/users");
const error = require("../utilities/error");

// Allows the client to see the user information and add new users
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
    } else next(error(400, "Insufficient Data"));
  });

  // Allows the client to access the user information by id
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

// Allows the client to update user information by id
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

// Allows the user to delete user data by id
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
