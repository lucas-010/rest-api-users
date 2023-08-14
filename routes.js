const express = require("express");
const { param } = require("express-validator");
const UserController = require("./controllers/UserController");
const router = express.Router();

const idParamValidator = [
    param("id").isInt().withMessage("O ID deve ser um número inteiro.")
];


router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/user", UserController.getAll);
router.get("/user/:id", idParamValidator, UserController.getById);

module.exports = router;