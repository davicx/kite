/*
public $userID = "";
public $userName = "";
public $firstName = "";
public $lastName = "";
public $gender = "";
public $fullUserName = "";
public $email = "";
public $biography = "";
public $userImage = "";
public $totalFriends = 0;
public $totalFollowers = 0;
public $totalFollowing = 0;
public $totalGroups = 0;	
public $totalPosts = 0;	
public $totalLists = 0;
*/

/*

const express = require('express')
const morgan = require('morgan')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(morgan('short'))
//app.use(morgan('combined'))


app.use(bodyParser.json());

//USER FUNCTIONS:
//Method A1: Get User Info
app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })

  const userId = req.params.id
  console.log(userId);
  const queryString = "SELECT * FROM user_profile WHERE user_id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
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

//Method A2: Get User Friends


//Method D1: Register User
app.post('/register_user', (req, res) => { 
  console.log("Trying to create a new user...");
  console.log("I am post")
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var userName = "temp";
   
  //console.log(req.body)
  //console.log(req.body.firstName)
  //console.log(req.body.lastName)
  console.log(firstName + " " + lastName)
  

  const queryString = "INSERT INTO user_profile (user_name, first_name, last_name) VALUES (?, ?, ?)"
  getConnection().query(queryString, [userName, firstName, lastName], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
  

  res.end();
})
*/

/*
app.post('/register_user', (req, res) => {
 
  
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name 
  
  console.log("First name: " + req.body.create_first_name)
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
  
})

*/

//DATABASE

//CLEAN
/*
app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.send("Hello!!")
      res.end()
  })

app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})



 
//USERS
app.get('/users', (req, res) => {
  console.log("Responding to database route");
  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'shareshare'
    })
    const queryString = "SELECT * FROM user_profile";
    connection.query(queryString, (err, rows, fields) => {    
      console.log("Fetched")
      //res.json(rows);
      const users = rows.map((row) => {
        return { 
          userName: row.user_name,
          firstName: row.first_name,
          lastName: row.last_name,
          biography: row.biography
         }
      })
      res.json(users);


  })
})


//POSTS 
app.get('/posts', (req, res) => {
  //console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })

  //const postID = req.params.id
  //console.log(postID);
  const queryString = "SELECT * FROM posts WHERE master_site = ? AND post_type = ?"
  connection.query(queryString, ["shareshare", "video"], (err, rows, fields) => {
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


function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shareshare'
  })
}

*/
/*
app.get("/users", (req, res) => {
  var user1 = {firstName: "David", lastName: "V"}
  const user2 = {firstName: "Frodo", lastName: "B"}
  const user3 = {firstName: "Bilbo", lastName: "B"}
  res.json([user1, user2, user3])
})
*/