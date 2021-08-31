const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const moment = require("moment");
var mongoose = require('mongoose');
var admin = require('../model/admin');
const jwt = require("jsonwebtoken");

router.post("/login",async (req, res) => {
  console.log("in admin login" , req.body);
  let email = req.body.email;
  let password = req.body.password;
  admin.findOne({ email: email,})
      .exec()
      .then(async (auth) => {
          //console.log("authhhh", auth);
          if (auth) {
              const id = auth._id;
              const email =auth.email;
              await bcrypt.compare(password, auth.password, (err, result) => {
                  if (err) {
                      console.log("error", err)
                      return res.status(500).json({
                          message: "password decryption error",
                      });
                  } else {
                      if (result == true) {
                          // const userToken = localStorage.getItem('userToken')
                          const loginToken = jwt.sign({ id , email }, "process.env.jwtSecret", {
                              expiresIn: "1h",
                          });
                          res.status(200).json({
                              message: "login Successful",
                              token: loginToken,
                              user: auth,
                              id: id,
                          });
                      } else {
                          return res.status(403).json({
                              message: "Invalid Password",
                          });
                      }
                  }
              });
          } else {
              return res.status(404).json({
                  message: "No user found for this email",
              });
          }
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({
              error: err,
          });
      });
});

module.exports = router;