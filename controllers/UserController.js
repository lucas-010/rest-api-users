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

            return res.status(404).json({ msg: "Usuário não encontrado." });

        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível buscar o usuário.", error: err });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;
            const emailVerify = await User.findByEmail(email);
            if (emailVerify.length > 0) {
                return res.status(406).json({ msg: "Este email já está cadastrado." });
            }
            await User.create(name, email, password);
            return res.status(201).json({ msg: "Usuário cadastrado com sucesso." });
        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível cadastrar o usuário.", error: err });
        }
    }

    async delete(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const result = await User.delete(req.params.id);
            if (result == 1) {
                return res.status(200).json({ msg: "Usuário deletado com sucesso." });
            }
            return res.status(404).json({ msg: "Usuário não encontrado." });

        } catch (err) {
            return res.status(500).json({ msg: "Não foi possível deletar o usuário.", error: err });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            let resultEmail = 0;
            let resultName = 0;
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            if (req.body.email != undefined && req.body.email != "") {
                resultEmail = await User.updateEmail(req.params.id, req.body.email);
            }

            if (req.body.name != undefined && req.body.name != "") {
                resultName = await User.updateName(req.params.id, req.body.name);
            }

            if (resultEmail == 1 && resultName == 1) {
                return res.status(200).json({ msg: "O nome e o email do usuário foram alterados." });
            }

            if (resultEmail == 1) {
                return res.status(200).json({ msg: "O email do usuário foi alterado." });
            }

            if (resultName == 1) {
                return res.status(200).json({ msg: "O nome do usuário foi alterado." });
            }

            return res.status(404).json({ msg: "Usuário não encontrado." })

        } catch (err) {
            res.status(500).json({ msg: "Não foi possível atualizar o usuário.", errors: err })
        }
    }
}

module.exports = new UserController();