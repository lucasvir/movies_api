exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id');
    table.text('name');
    table.text('email');
    table.text('password');
    table.text('avatar');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });

exports.down = knex => knex.schema.dropTable('users');
