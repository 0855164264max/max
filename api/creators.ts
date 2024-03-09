import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';

import { ModelCreator } from "../model/ModelCreator";
export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from Creator', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query('select * from Creator where creator_id = ?', [id], (err, result) =>{
      res.json(result);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Creator where creator_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });


  router.post("/", (req, res) => {
    let creator: ModelCreator = req.body;
    let sql =
      "INSERT INTO `Creator`(`type`,`person_id`, `movie_id`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      creator.type,
      creator.person_id,
      creator.movie_id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });