/*
FUNCTIONS A: All Functions Related to Making a Post
	1) Function A1: Post Text  
	2) Function A2: Post a Photo
	3) Function A3: Post a Video
	4) Function A4: Post an Article
	5) Function A5: Post a File 
	
FUNCTIONS B: All Functions Related to Post Actions 
	1) Function B1: Like a Post 
	2) Function B2: UnLike a Post	
	3) Function B3: Delete a Post  	
	4) Function B4: Edit Post Caption (Save New Caption) 

FUNCTIONS C: All Functions Related to Commenting on a Post 
	1) Function C1: Make a New Comment 
	2) Function C2: Edit a Comment
	3) Function C3: Delete a Comment 
*/ 

const express = require('express')
const postsRouter = express.Router();
const mysql = require('mysql')

postsRouter.get('/allPosts', (req, res) => {
    console.log("my messages");
    res.end();
})


postsRouter.get('/groupPosts/:groupID', (req, res) => {
  console.log("Responding to database route");

  console.log(req.params.groupID);
  var groupID = req.params.groupID;

  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'shareshare'
    })
 
    
    const queryString = "SELECT * FROM posts WHERE post_to = ?"
    connection.query(queryString, [groupID], (err, rows, fields) => {
        if (err) {
          console.log("Failed to query for users: " + err)
          res.sendStatus(500)
          return
          // throw err
        }
    
        console.log("I think we fetched users successfully");
        res.json(rows);
    })  
  
})


postsRouter.get('/posts/:userName', (req, res) => {
    console.log("Responding to database route");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'shareshare'
      })
      const queryString = "SELECT * FROM posts";
      connection.query(queryString, (err, rows, fields) => {   
          
        const posts = rows.map((row) => {
            return { 
              postType: row.post_type,
              postFrom: row.post_from,
              postTo: row.post_to,
              postCaption: row.post_caption
             }
          })

        res.json(posts);
    })
})
  

//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shareshare'
  })
  
  
  function getConnection() {
    return pool;
    //Can do pool.query
  }
 

module.exports = postsRouter;
  

 