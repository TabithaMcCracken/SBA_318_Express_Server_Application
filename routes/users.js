const express = require("express");
const router = express.Router();
const users = require("../data/users");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.render("users", { users });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

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

router.delete("/:id/delete", (req, res, next) => {
    const userId = req.params.id;
  
    const userIndex = users.findIndex((user) => user.id == userId);
  
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      res.json(deletedUser);
    } else {
      next(error(404, "User not found"));
    }
  });
  
module.exports = router;
