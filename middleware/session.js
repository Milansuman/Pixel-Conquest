const session = require("../models/session");
const user = require("../models/user");

module.exports.sessionToUser = (req, res, next) => {
    const sessionId = req.cookies.session;
    if(sessionId) req.user = user.getUserById(session.getSession(sessionId).user_id);
    next();
}