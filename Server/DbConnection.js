
const dbConnection = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "0047",
    database: "penweb",
  },
};
const db = require("knex")(dbConnection);
module.exports = db;


//Connection Checker
//  db.select('*').from('users').then(data => {
//   console.log(data)
// })



 