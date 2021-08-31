const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const moment = require("moment");
var mongoose = require("mongoose");
var admin = require("../model/admin");
var result = require("../model/result");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  let user_role = req.body.user_role;
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  password = hash;

  let Admin = new admin({
    username: username,
    email: email,
    password: password,
    user_role: user_role,
  });

  admin
    .findOne({ email: email })
    .exec()
    .then(async (auth) => {
      if (auth) {
        res.send("Admin Already");
      } else {
        Admin.save().then((res1) => {
          console.log(res1);
          res.json(res1);
        });
      }
    });
});

router.post("/answer/submit", async (req, res) => {
  //let decoded = jwt_decode(req.headers["token"]);
  //const {email} = decoded

  // checking for empty fields

  let emaill = req.body.email;
  let resultt = req.body.result;

  let Result = new result({
    email: emaill,
    result: resultt,
  });

  Result.save()
    .then((res1) => {
      //console.log(res1)
      res.json(res1);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/admin", (req, res) => {
  result.find().then(ress => {
    res.json(ress)
  })
    
});

module.exports = router;
