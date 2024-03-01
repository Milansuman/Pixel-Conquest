const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const user = require("./controllers/user");
const {sessionToUser} = require("./middleware/session");

const app = express();

app.use(cookieParser());
app.use(express.static("public/"));

app.use("/api/user", user);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "login.html"));
})

app.get("/pixel", sessionToUser,  (req, res) => {
    if(!req.user) res.location("/login").send(403);
    res.sendFile(path.join(__dirname, "/views", "pixel.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "index.html"));
})

app.listen(9000, () => {
    console.log("Listening on http://localhost:9000");
});