const express = require('express')
const morgan = require('morgan')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(morgan('short'))
//app.use(morgan('combined'))
app.use(bodyParser.json());

//User Router
const router = require('./routes/user.js');
app.use(router);

//Posts Router
const postRouter = require('./routes/posts.js');
app.use(postRouter);



//CLEAN BELOW
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello!!")
    res.end()
})

app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})


app.post('/post_user', (req, res) => {
  console.log("POST User");
  console.log(req.body);
  var country = req.body.country;
  var firstName = "temp";
  var lastName = "lastName";
  const queryString = "INSERT INTO temp (first_name, last_name, country) VALUES (?, ?, ?)"
  getConnection().query(queryString, [firstName, lastName, country], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
  

 
  /*
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })

  connection.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE user_profile SET user_name = 'Updated' WHERE user_profile_id = '61'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });
  */
  res.end();

})

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


/*


//Method A2: Get User Friends



//Full
app.get('/getUserfriends/:userName', (req, res) => {
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


//Simple Working
app.get('/getfriends/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })

  const userId = req.params.id
  console.log(userId);
  const queryString = "SELECT * FROM friends WHERE user_id = ?"
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



*/

/*
app.get('/getfriends/:id', (req, res) => {
 
  const userId = req.params.id
  console.log(userId);
  const queryString = "SELECT * FROM friends WHERE user_id = ?";

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


*/
/*
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

//Method D.2: Update User
app.post('/update_user', (req, res) => {
  console.log("Update User");
  console.log(req.body);

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shareshare'
  })

  connection.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE user_profile SET user_name = 'Updated' WHERE user_profile_id = '61'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });
  res.end();


})

*/






/*
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});
*/


/////
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



 
//USERS
/*
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

*/


/*
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