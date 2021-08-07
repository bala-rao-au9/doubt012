const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

DiscussionSchema.virtual("replies", {
  ref: "Replies",
  localField: "_id",
  foreignField: "discussion",
});

const discussion = mongoose.model("Discussions", DiscussionSchema);

module.exports.DiscussionModel = discussion;
