const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Atlas connection established successfully!");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);


app.listen(port, () => {
  console.log("Server started on port: " + port);
});
