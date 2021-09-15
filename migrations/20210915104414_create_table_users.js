
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.string('url_avatar', 1000).notNull()
        table.string('bio').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.string('company')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
