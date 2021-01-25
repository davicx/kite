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
  

 
/*

//localhost:8080/api/story
router.get('/story', function(req, res){
  res.send('welcome to our story');
})

//localhost:8080/api
app.use('/api', router); 

//localhost:8080/user/02213
var anotherRouter = express.Router();
anotherRouter.get('/user/:id', function(req , res){ 
  console.log(req.params.id);
  res.end();
});
app.use('/', anotherRouter);

*/