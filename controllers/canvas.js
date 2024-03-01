const express = require("express");
const canvas = require("../models/canvas");
const {rateLimit} = require("express-rate-limit");
const {sessionToUser} = require("../middleware/session");

const router = express.Router();

const limiter = rateLimit({
    windowMs: 5 * 60,
    max: 1,
    standardHeaders: true,
    legacyHeaders: true
})

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

router.post("/", limiter, sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.writePixel(req.user.id, req.body.color, req.body.x, req.body.y);
        res.json({ err: null });
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
})

router.post("/rect", limiter, sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.writeRect(req.user.id, req.body.color, req.body.x, req.body.y, req.body.width, req.body.height);
        res.json({ err: null });
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
})

router.delete("/", limiter, sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.clearPixels(req.user.id);
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
})

router.put("/invisible", limiter, sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.setInvisible(req.body.x, req.body.y)
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
})

router.put("/visible", limiter, sessionToUser, (req, res) => {
    try {
        if(!req.user) res.status(403).json({
            err: "Login to place pixel"
        })
        canvas.setVisible(req.body.x, req.body.y)
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
})

module.exports = router