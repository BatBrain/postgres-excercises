"use strict"

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
let ask = process.argv[2];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  let query = client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1;", [ask], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    client.end();
  });
  query.on('end', (result) =>{
    console.log(`Found ${result.rowCount} person(s) by the name ${query}`);
    for (let row of result.rows) {
      console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`)
    }
  })

});