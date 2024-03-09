import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';

export const router = express.Router();

// Path params
// router.get("/:id", (req, res) => {
//     res.send("Get in imdb.ts id: " + req.params.id);
//   });

//Query params
// router.get("/", (req, res) => {
//     if (req.query.id) {
//       res.send("Get in imdb.ts Query id: " + req.query.id);
//     } else {
//       res.send("Get in imdb");
//     }
//   });

  // Body String
//   router.post("/", (req, res) => {
//     let body = req.body; 
//     res.send("Get in imdb.ts body: " + body);
//   });

  // router.get("/", (req, res) => {
  //   conn.query('select * from movies', (err, result, fields)=>{
  //     res.json(result);
  //   });
  // });

  

  router.get("/", (req, res) => {
    conn.query('SELECT m.ttitle AS movie_title, m.plot, GROUP_CONCAT(DISTINCT p.name) AS actor_names, GROUP_CONCAT(DISTINCT c.name) AS creator_names   FROM movies m  INNER JOIN stars s ON m.movie_id = s.movie_id  INNER JOIN person p ON s.person_id = p.person_id  INNER JOIN creators cr ON m.movie_id = cr.movie_id  INNER JOIN person c ON cr.person_id = c.person_id  GROUP BY m.ttitle, m.plot;', (err, result, fields)=>{
      if (err) {
        res.status(500).json({ error: err.message });
        res.json(result);
        return;
      }
      res.json(result);
    });
  });
  
