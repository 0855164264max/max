import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';

import { ModelStar } from "../model/ModelStar";
export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from stars', (err, result, fields)=>{
      res.json(result);
    });
  });
  router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select  * from stars where stars_id = ?", [id], (err, result) => {
      res.json(result);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from stars where stars_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });


  router.post("/", (req, res) => {
    let stars: ModelStar = req.body;
    let sql =
      "INSERT INTO `stars`(`type`,`person_id`, `movie_id`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
        stars.type,
        stars.person_id,
        stars.movie_id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });