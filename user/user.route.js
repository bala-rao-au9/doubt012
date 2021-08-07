const express = require("express");
const passport = require("passport");
const { UserModel } = require("./user.model");
const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");
const router = express.Router();

// Create the user
router.post("/user", async (req, res) => {
  const user = new UserModel(req.body);
  user.setPassword(user.password);
  user
    .save()
    .then(async (result) => {
      res.status(201).send(user.toAuthJSON());
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Login the user
router.post("/user/login", async (req, res) => {
  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).send(info);
    }
  )(req, res);
});

// whether he is successfully logged in or not.
router.get("/user/current", auth.required, userAuth, (req, res) => {
  return res.status(302).send({
    data: req.user,
    access: "allowed",
  });
});

// Logout the user
router.post("/user/logout", async (req, res) => {
  res.status(200).send("User Logged out");
});

module.exports = router;
