const mongoose = require("mongoose");
const { options } = require("../config/options");

//connect with the database

mongoose.set("strictQuery", false);

mongoose.connect(options.mongoDb.url, (err) => {
  if (err) return console.log(`Error establishing a database connection ${err}`);
  console.log("Connection successful");
});
