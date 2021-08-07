const DiscussionModel = require("./discussion.model");
const DiscussionRouter = require("./discussion.route");

module.exports.Discussion = {
    model: DiscussionModel,
    router: DiscussionRouter,
};