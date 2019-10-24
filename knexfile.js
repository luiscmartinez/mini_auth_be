require('dotenv').config()
// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_LOCAL_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'dbmigrations',
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'dbmigrations',
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },
}
