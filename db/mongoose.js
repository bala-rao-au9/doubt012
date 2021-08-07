var mongoose = require("mongoose");

const connectionURL = process.env.MONGODB_URL;
const database = process.env.DB_NAME;

//Set up default mongoose connection
var mongoDB =

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Get the default connection
var db = mongoose.connection;

db.once("open", function () {
  console.info("Connected with MongoDB with Database named as", database);
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));
