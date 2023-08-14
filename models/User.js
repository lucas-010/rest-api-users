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

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email"]).where({ id: id }).table("users");
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new User();