exports.up = function(knex) {
  return knex.schema.createTable('posts', tbl => {
    tbl.increments('id')
    tbl.string('content')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts')
}
