exports.up = (knex) =>
  knex.schema.createTable('favorites', (table) => {
    table.increments('id')
    table.text('title')
    table.text('thumbnail')
    table.text('videoId')
  })

exports.down = (knex) => knex.schema.dropTable('favorites')
