// Update with your config settings.

module.exports = {
    client: 'pg',
    connection: {
      database: 'cmd',
      user:'postgres',
      password: '0000'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
