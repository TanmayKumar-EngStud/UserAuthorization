const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect("mongodb://localhost/student_teacher", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", function () {
    console.log("connected to mongodb");
  })
  .on("error", function (error) {
    console.log("error in connection", error);
  });

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  authority: {
    type: String,
    required: true,
  },
});
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    console.log(user);
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  console.log(user);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.post("/users/signIn", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  console.log(user);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
      // adding this user to mongoDB
      const userSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        authority: {
          type: String,
          required: true,
        },
      });
      const User = mongoose.model("User", userSchema);
      const newUser = new User({
        name: req.body.name,
        password: bcrypt.compare(req.body.password, user.password),
        authority: req.body.authority,
      });
      newUser.save();
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
