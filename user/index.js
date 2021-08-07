const UserModel = require("./user.model");
const UserRouter = require("./user.route");

module.exports.User = {
    model: UserModel,
    router: UserRouter,
};