const User = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
    async getAll(req, res) {
        try {
            const results = await User.findAll();
            return res.json(results);
        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível buscar os usuários.", error: err });                                     
        }
    }

    async getById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = await User.findById(req.params.id);
            if (user) {
                return res.status(200).json({ user });
            }

            return res.status(404).json({ msg: "Usuário inexistente." });

        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível buscar o usuário.", error: err });
        }
    }
}

module.exports = new UserController();