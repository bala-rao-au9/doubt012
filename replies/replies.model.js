const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Users",
    },
    discussion: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Discussions",
    },
    replies: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const replies = mongoose.model("Replies", repliesSchema);

module.exports.RepliesModel = replies;