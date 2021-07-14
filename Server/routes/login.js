const express = require("express");
const router = express.Router();
const db = require("../DbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('config');

const dbb =config.get('jwtSecret');

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  } else {
    db.select("email", "password")
      .from("users")
      .where("email", "=", email)
      .then((data) => {
        let isValid = bcrypt.compareSync(password, data[0].password);
        if (isValid) {
          db.select("*")
            .from("users")
            .where("email", "=", email)
            .then((data) => {
              const token = jwt.sign(data[0], config.get('jwtSecret'), {
                expiresIn: "1h",
              });
                return res.status(200).json({ data: data[0], token: token });
            })
            .catch((err) =>
             res.status(400).json({ message: "Password or email incorrect." })
             //console.log(err)
            );
        } else {
          res.status(400).json({ message: "Password or email incorrect else part." });
        }
      })
      .catch((err) => {
        res.status(400).json("Email & password not matched") 
      });
    }
});

module.exports = router;