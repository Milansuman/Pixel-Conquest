const express = require("express");
const cookieParser = require("cookie-parser");

const user = require("./controllers/user");

const app = express();

app.use(cookieParser());
app.use(express.static("public/"));

app.use("/api/user", user);

app.listen(9000, () => {
    console.log("Listening on http://localhost:9000");
});