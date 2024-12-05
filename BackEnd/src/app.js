if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "./src/config/.env",
    });
}
const express = require("express");

const app = express();
const useRouter = require("./routes/user.route")

app.get("/", (req, res) => {
    return res.send('Welcome to Backend');
});

app.get("/create-user",(req,res)=>{
    return res.send({message: "Good Afternoon"})
})

module.exports = app;