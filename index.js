const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

app.listen(8080, () => {
    console.log("Server on http://localhost:8080");
});