import  mysql  from 'mysql';
import express from "express";
 import { conn } from "../dbconn";

import { ModelMovie } from '../model/ModelMovie';


export const router = express.Router();

router.get("/", (req, res) => {
  conn.query('select * from movie', (err, result, fields)=>{
    res.json(result);
  });
});


router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from movie where movie_id  = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });
  
  router.post("/", (req, res) => {
    let movie: ModelMovie = req.body;
    let sql =
      "INSERT INTO `movie`(`title`, `description`, `image`, `rating`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
      movie.title,
      movie.description,
      movie.image,
      movie.rating
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });





  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from movie where movie_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });



  router.get("/title/:title", (req, res) => {
    const title = "%" + req.params.title + "%";

    let query1 = "SELECT * FROM movie WHERE title LIKE ? ";
    let query2 = "SELECT stars.type, person.name FROM stars JOIN person ON stars.person_id = person.person_id JOIN movie ON stars.movie_id = movie.movie_id WHERE movie.title LIKE ?";
    let query3 = "SELECT creator.type, person.name FROM creator JOIN person ON creator.person_id = person.person_id JOIN movie ON creator.movie_id = movie.movie_id WHERE movie.title LIKE ?";

    let results : any= {};

    conn.query(query1, [title], (err, result1) => {
        if (err) {
            console.error(err);
            return res.status(400).json(err);
        }
        results.movie = result1;

        conn.query(query2, [title], (err, result2) => {
            if (err) {
                console.error(err);
                return res.status(400).json(err);
            }
            results.stars = result2;

            conn.query(query3, [title], (err, result3) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }
                results.creators = result3;

                res.json(results);
            });
        });
    });
});