/*
FUNCTIONS A: USER RELATED
	1) Method A1: Get User Info 
	2) Method A2: Get List of all User Friends 
	3) Method A3: Get Pending Requests *Not Done 
	4) Method A4: Request a Friend	
	5) Method A5: Cancel a Sent Friend Request
	6) Method A6: Remove a Friend
	7) Method A7: Update User Info
	
FUNCTIONS B: REQUEST RELATED	
	1) Method B1: Accept Friend Request
	2) Method B2: Decline Friend Request
	3) Method B3: Accept Group Request
	4) Method B4: Decline Group Request
	5) Method B5: Accept List Request
	6) Method B6: Decline List Request
	
FUNCTIONS C: USER SITE ACTIVITY 
	1) Method C1: Get New Group Posts
	2) Method C2: Get New Groups Discussions
	3) Method C3: Get New File Activity
	4) Method C4: Update Group Posts to Seen	
	5) Method C5: Update Group Discussion to Seen
	6) Method C6: Update New File Activity to Seen		

FUNCTIONS D: USER ACCOUNT	
	1) Method D1: Register User
	2) Method D2: Register User API
	2) Method D3: Register User with Email
	3) Method D4: Delete User
	4) Method D5: Request Username *currently this happens in the user.php file 
	5) Method D6: Request Password Send Email (Part 1) *currently this happens in the user.php file 
	6) Method D7: Request Password Update to New Password (Part 2) *currently this happens in the user.php file 	

*/


const express = require('express')
const router = express.Router();
const mysql = require('mysql')

router.get('/messages', (req, res) => {
    console.log("my messages");
    res.end();
})

//USER FUNCTIONS:
//Method A1: Get User Info
router.get('/user/:id', (req, res) => {
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



//Method A2: Get All Users Friends
router.get('/getUserfriends/:userName', (req, res) => {
  console.log("Fetching user: " + req.params.userName);

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })
  const userName = req.params.userName

  const queryString = `SELECT friends.user_name, friends.friend_user_name, friends.friend_id, friends.request_pending, user_login.user_name, user_login.user_id, user_login.account_deleted
    FROM user_login INNER JOIN friends
    ON user_login.user_name = friends.friend_user_name
    WHERE friends.user_name = ?
    AND friends.request_pending = 0
    AND user_login.account_deleted = 0`

  connection.query(queryString, [userName], (err, rows, fields) => {
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


///


//SORT





//Get All Users
router.get('/users', (req, res) => {

  const connection = getConnection();
  const queryString = "SELECT * FROM user_profile";
  connection.query(queryString, (err, rows, fields) => {    
      console.log("Fetched")
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

  /*
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
  */
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

module.exports = router;
  