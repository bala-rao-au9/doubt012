const jwt = require("jsonwebtoken");
const { UserModel } = require("../user/user.model");

const auth = async(req, res, next) => {
    try {
        const {
            payload: { id },
        } = req;
        return UserModel.findById(id).then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: "Please Authenticate" });
    }
};

module.exports = auth;