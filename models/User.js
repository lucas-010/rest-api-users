const knex = require("../database/connection");
const bcrypt = require("bcrypt");

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

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "name", "email"]).where({ email: email }).table("users");
            return result;
        } catch (err) {
            throw err;
        }
    }

    async create(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10);
            await knex.insert({ name, email, password: hash }).table("users");
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        try {
            const result = await knex.table("users").where({ id: id }).del();
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateName(id, name) {
        try {
            const result = await knex.update({ name }).where({ id }).table("users");
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateEmail(id, email) {
        try {
            const result = await knex.update({ email }).where({ id }).table("users");
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new User();