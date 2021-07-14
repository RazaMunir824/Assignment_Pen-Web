const express = require("express");
const db = require("../DbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const moment = require("moment");

router.get("/user/:id", (req, res) => {
  return db
    .select("*")
    .from("users")
    .where({ user_id: req.params.id })
    .then((data) => res.json(data));
});

router.post("/register", (req, res) => {
  const {username, email,password, user_role} = req.body;

  // checking for empty fields
  if (!username || !email || !password || password.length < 4 ){
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  }
  //encrypting password
  let hash = bcrypt.hashSync(password, 10);

  return db("users")
    .returning("*")
    .insert({
      username,
      email,
      password: hash,
      user_role,
    })
    .then((data) => res.status(200).json(data[0]))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Email or contact number already exists." })
    );
});

router.post("/answer/submit", (req, res) => {
  let decoded = jwt_decode(req.headers["token"]);
  const {email} = decoded
  const {result} = req.body;

  // checking for empty fields
  if(!result, !email){
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  }
  //encrypting password
  return db("result")
    .returning("*")
    .insert({
      result,
      email:email
    })
    .then((data) => res.status(200).json(data[0]))
    .catch((err) =>
      console.log(err)
    );
});


router.get("/admin", (req, res) => {
  return db
    .select("*")
    .from("result")
    .then((data) => res.send( data));
});


module.exports = router;