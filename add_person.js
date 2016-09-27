"use strict"

const pg = require("pg");
const connectionSettings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: connectionSettings,
  searchpath: 'knex,public'
});

knex('famous_people')
.insert({
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
})
.then((res) => {
  console.log('Insert successful!');
})
.then(() => {
  knex('famous_people').where('first_name', `${process.argv[2]}`).select()
  .then((res) => {
    console.log(res);
  });
});