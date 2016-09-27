
exports.up = function(knex, Promise) {
  knex.schema.createTable('milestones', function(table){
    table.increments('id');
    table.string('description');
    table.date('date_achieved');
    table.foreign('famous_person_id').references('famous_people.id');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('milestones');
};
