const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const user = require("./controllers/user");

const app = express();

app.use(cookieParser());
app.use(express.static("public/"));

app.use("/api/user", user);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "login.html"));
})

app.get("/pixel", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "pixel.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "index.html"));
})

app.listen(9000, () => {
    console.log("Listening on http://localhost:9000");
});