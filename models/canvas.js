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
    const pixelExists = database.prepare("select count(id) as cds from canvas where row=? and col=?;").get(x, y).cds > 0;

    if(pixelExists){
        database.prepare("update canvas set color=?, user_id=? where row=? and col=?;").run(color, userId, x, y);
    }else{
        database.prepare("insert into canvas(row, col, color, user_id) values (?,?,?,?);").run(x, y, color, userId);
    }
}

module.exports.dumpCanvas = () => {
    return database.prepare("select row, col, color from canvas order by row, col;").get();
}