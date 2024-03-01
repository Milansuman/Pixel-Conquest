const database = require("../database");

/*
CREATE TABLE canvas (
    id integer not null primary key,
    row integer not null,
    col integer not null,
    color text not null,
    user_id integer not null,
    foreign key (user_id) references user(id)
);
*/

module.exports.writePixel = (userId, color, x, y) => {
    const statement = database.prepare("insert into canvas(row, col, color, user_id) values (?,?,?,?);");
    statement.run()
}