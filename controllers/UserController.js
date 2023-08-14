const User = require("../models/User");

class UserController {
    async getAll(req, res) {
        try {
            const results = await User.findAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ msg: "Não foi possível buscar os usuários.", error: err });                                     
        }

    }
}

module.exports = new UserController();