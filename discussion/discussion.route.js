const express = require("express");
const { DiscussionModel } = require("./discussion.model");
const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.get("/discussion", (req, res) => {
  DiscussionModel.find({}, function (err, discussion) {
    if (err) {
      return res.status(500).send(error);
    } else {
      return res.send(discussion);
    }
  });
});

router.get("/user/discussion", auth.required, userAuth, async (req, res) => {
  try {
    const discussion = await DiscussionModel.find({ owner: req.user._id });
    if (!discussion) {
      return res.status(404).send();
    }
    return res.send(discussion);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/discussion", auth.required, userAuth, (req, res) => {
  const discussion = new DiscussionModel({
    ...req.body,
    owner: req.user._id,
  });

  discussion
    .save()
    .then(() => {
      return res.status(201).send(discussion);
    })
    .catch((err) => {
      return res.status(400).send("Error");
    });
});

router.get("/discussion/:id", auth.required, userAuth, async (req, res) => {
  try {
    const discussion = await DiscussionModel.find({
      _id: req.params["id"],
      owner: req.user._id,
    });
    if (!discussion) {
      return res.status(404).send();
    }
    return res.send(discussion);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
