const express = require("express");
const { param, body } = require("express-validator");
const UserController = require("./controllers/UserController");
const router = express.Router();

const idParamValidator = [
    param("id").isInt().withMessage("O ID deve ser um número inteiro.")
];

const fieldsBodyValidator = [
    body("name").notEmpty().withMessage("Campo obrigatório."),
    body("email").notEmpty().withMessage("Campo obrigatório.").isEmail().withMessage("Email inválido."),
    body("password").notEmpty().withMessage("Campo obrigatório.")
]

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/user", UserController.getAll);
router.get("/user/:id", idParamValidator, UserController.getById);
router.post("/user", fieldsBodyValidator);

module.exports = router;