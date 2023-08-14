require("dotenv").config();

const knex = require("knex").knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: "users-v1"
    }
});

module.exports = knex;