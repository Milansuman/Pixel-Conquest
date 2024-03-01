const express = require("express");
const canvas = require("../models/canvas");
const {sessionToUser} = require("../middleware/session");

const router = express.Router();

router.use(express.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
    try {
        res.json(canvas.dumpCanvas());
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
})

router.post("/", sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.writePixel(req.user.id, req.body.color, req.body.x, req.body.y);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
})

module.exports = router