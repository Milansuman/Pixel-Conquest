const database = require("../database");

/*
CREATE TABLE canvas (
    id integer not null primary key,
    row integer not null,
    col integer not null,
    color text not null,
    user_id integer not null,
    invisible boolean not null default false;
    foreign key (user_id) references user(id)
);
*/

module.exports.writePixel = (userId, color, x, y) => {
    const pixelExists = database.prepare("select count(id) as cds from canvas where row=? and col=? and invisible=0;").get(x, y).cds > 0;

    if(pixelExists){
        database.prepare("update canvas set color=?, user_id=? where row=? and col=?;").run(color, userId, x, y);
    }else{
        database.prepare("insert into canvas(row, col, color, user_id) values (?,?,?,?);").run(x, y, color, userId);
    }
}

module.exports.writeRect = (userId, color, x, y, width, height) => {
    for(let i=x; i<width; i++){
        for(let j=y; j<height; j++){
            this.writePixel(userId, color, i, j);
        }
    }
}

module.exports.clearPixels = (userId) => {
    database.prepare("delete from canvas where user_id=? and invisible=0;").run(userId);
}

module.exports.dumpCanvas = () => {
    return database.prepare("select row, col, color from canvas order by row, col;").all();
}

module.exports.setInvisible = (x, y) => {
    database.prepare("update canvas set invisible=1 where row=? and col=?;").run(x, y);
}

module.exports.setVisible = (x, y) => {
    database.prepare("update canvas set invisible=1 where row=? and col=?;").run(x, y);
}