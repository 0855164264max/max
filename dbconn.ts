import mysql from "mysql";

export const conn = mysql.createPool({
  // connectionLimit: 10,
  // host: "localhost",
  // user: "demo",
  // password: "abc123",
  // database: "work5",

  connectionLimit: 10,
  host: "sql6.freemysqlhosting.net",
  user: "sql6689854",
  password: "RVwcFhvWiV",
  database: "sql6689854",
});