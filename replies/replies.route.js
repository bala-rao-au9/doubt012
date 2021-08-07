const express = require("express");
const { RepliesModel } = require("./replies.model");
const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.get("/replies", auth.required, userAuth, async (req, res) => {
  try {
    const replies = await RepliesModel.find({ owner: req.user._id });
    if (!replies) {
      return res.status(404).send();
    }
    return res.send(replies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/replies", auth.required, userAuth, (req, res) => {
  const replies = new RepliesModel({
    owner: req.user._id,
    discussion: req.body["discussion"],
    replies: req.body["replies"],
  });
  replies
    .save()
    .then(async (result) => {
      res.status(201).send(replies);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/replies/:discussionId", async (req, res) => {
  try {
    const replies = await RepliesModel.find({
      discussion: req.params["discussionId"],
    });
    if (!replies) {
      return res.status(404).send();
    }
    return res.send(replies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
