import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "demo",
  password: "abc123",
  database: "work5",
});