const database = require("../database");

/*
create table user (
    id integer not null primary key,
    username text not null,
    password text not null
);
*/

/**
 * Inserts a user into the database
 * @param {string} username 
 * @param {string} password 
 */
module.exports.registerUser = (username, password) => {
    const statement = database.prepare("insert into user (username, password) values (?,?);");
    statement.run(username, password);
}

/**
 * 
 * @param {string} password 
 * @param {string} username 
 * @returns {object}
 */
module.exports.getUser = (username, password) => {
    const statement = database.prepare("select * from user where username=? and password=?;");
    return statement.get(username, password)
}

/**
 * 
 * @param {number} id 
 * @returns {object}
 */
module.exports.getUserById = (id) => {
    const statement = database.prepare("select * from user where id=?;");
    return statement.get(id);
}

/**
 * Checks whether a user exists
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
module.exports.validateUser = (username, password) => {
    const statement = database.prepare("select count(id) as cnt from user where username=? and password=?")
    const userCount = statement.get(username, password).cnt;
    if(userCount > 0){
        return true;
    }else{
        return false;
    }
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {number}
 */
module.exports.login = (username, password) => {
    if(this.validateUser(username, password)){
        const statement = database.prepare("insert into session (user_id) values (?);");
        return statement.run(this.getUser(username, password).id).lastInsertRowid;
    }else{
        throw new Error("Unable to login.");
    }
}