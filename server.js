const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // for encryptions
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongoDB");
});
const userSchema = require("./modelTable");
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/signin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    };

    const userData = new userSchema({
      name: user.name,
      username: user.username,
      password: hashedPassword,
    });
    try {
      const savedUser = await userData.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: err.message });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const data = await userSchema.find({ username: req.body.username });
    if (data == null) {
      return res.status(400).send("Cannot find user");
    }
    if (await bcrypt.compare(req.body.password, data[0].password)) {
      res.send("Success you are a valid user");
    } else {
      res.send("Incorrect Password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000);
