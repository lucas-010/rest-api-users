const User = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
    async getAll(req, res) {
        try {
            const results = await User.findAll();
            
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            return res.status(404).json({ msg: "Nenhum usuário encontrado." });
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

            const result = await User.findById(req.params.id);
            if (result.length > 0) {
                return res.status(200).json(result);
            }

            return res.status(404).json({ msg: "Usuário inexistente." });

        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível buscar o usuário.", error: err });
        }
    }
}

module.exports = new UserController();