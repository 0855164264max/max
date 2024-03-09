import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';

import { ModelPerson } from "../model/ModelPerson";
export const router = express.Router();

 router.get("/", (req, res) => {
    conn.query('select * from person', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query('select * from person where person_id = ?', [id], (err, result) =>{
      res.json(result);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from person where person_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });


  router.post("/", (req, res) => {
    let person: ModelPerson = req.body;
    let sql =
      "INSERT INTO `person`(`name`, `birthdate`, `image` ,`biography`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
      person.name,
      person.birthdate,
      person.biography,
      person.image
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });