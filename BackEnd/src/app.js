if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "./src/config/.env",
    });
}
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send('Welcome to Backend');
});

module.exports = app;