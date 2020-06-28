const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
require("dotenv").config();
//Create server
const app = express();
//specify the PORT
const port = process.env.PORT || 6666;

//Parse the data and her we replace body-pars with express.json()
app.use(cors());
app.use(express.json());

//Connection to mongoDB Data Base online (Mongo Atlas)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routers
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});
