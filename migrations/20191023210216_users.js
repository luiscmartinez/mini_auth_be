exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id')
    tbl.string('email')
    tbl
      .string('username')
      .nullable()
      .unique()
    tbl.string('profile_img').nullable()
    tbl.string('provider').nullable()
    tbl.integer('provider_id')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
