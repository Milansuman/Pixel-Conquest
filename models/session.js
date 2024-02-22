const database = require("../database");

/*
CREATE TABLE session (
    id integer not null primary key,
    user_id integer not null,
    foreign key (user_id) references user(id) 
);
*/

/**
 * 
 * @param {number} sessionId 
 * @returns {boolean}
 */
module.exports.verifySession = (sessionId) => {
    const statement = database.prepare("select count(id) as cnt from session where id=?;");
    const count = statement.get(sessionId);
    return count > 0;
}

/**
 * 
 * @param {number} sessionId 
 * @returns {object}
 */
module.exports.getSession = (sessionId) => {
    const statement = database.prepare("select * from session where id=?;");
    return statement.get(sessionId);
}

/**
 * 
 * @param {number} sessionId 
 */
module.exports.deleteSession = (sessionId) => {
    const statement = database.prepare("delete from session where id=?;");
    statement.run(sessionId);
}