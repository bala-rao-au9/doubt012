const RepliesModel = require("./replies.model");
const RepliesRouter = require("./replies.route");

module.exports.Replies = {
    model: RepliesModel,
    router: RepliesRouter,
};