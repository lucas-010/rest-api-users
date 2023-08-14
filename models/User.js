const knex = require("../database/connection");

class User {
    async findAll() {
        try {
            const results = await knex.select(["id", "name", "email"]).table("users");
            return results;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new User();