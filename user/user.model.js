const mongoose = require("mongoose");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trime: true,
      minlength: 6,
    },
    salt: String,
  },
  { timestamps: true }
);

UsersSchema.virtual("discussion", {
  ref: "Discussions",
  localField: "_id",
  foreignField: "owner",
});

UsersSchema.virtual("replies", {
  ref: "Replies",
  localField: "_id",
  foreignField: "owner",
});

// For Setting the encrypted password in MongoDB
UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10, 512, "sha512")
    .toString("hex");
};

// For Validating the password by incrypting the password with same salt and key
UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10, 512, "sha512")
    .toString("hex");
  return this.password === hash;
};

// Generating the JWT token once the user's password matches in with MongoDB.
UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};

// For Sending the Response to User if he validates with email and JwtToken which is having expiration Date too.
UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

const users = mongoose.model("Users", UsersSchema);

module.exports.UserModel = users;
