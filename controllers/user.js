const express = require("express");
const user = require("../models/user");

const router = express.Router();

router.use(express.urlencoded({
    extended: true
}));

router.post("/", (req, res) => {
    try {
        user.registerUser(req.body.username, req.body.password);
        res.json({ err: null });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

router.post("/login", (req, res) => {
    try {
        const session = user.login(req.body.username, req.body.password);
        res.cookie("session", session).json({err:null});
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
})

module.exports = router;