const sqlite3 = require("better-sqlite3");

const database = sqlite3("pixel.db");
database.pragma('journal_mode = WAL');

module.exports = database;