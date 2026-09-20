import React, { useState } from 'react'



//SIMPLE 1
const SimpleArray = ({ currentUser, api }) => {
  const [users, addUser] = useState([])

  //Add User
  const addNewUser = () => {
    console.log(users)
    let newUser = {
        userID: 1,
        userName: "Sam",
    }
    addUser([...users, newUser])
  }

  return (
      <div> 
          <button onClick={ addNewUser }> Add New User </button>
          {users.map((user) => (
              <p key = { user.userID }> {user.userName}</p>
          ))} 
      </div>
  );
}


export default SimpleArray;

//SIMPLE 
/*
const SimpleArray = ({ currentUser, api }) => {
  const [users, addUser] = useState([])

  //Add User
  const addNewUser = () => {
    console.log(users)
    addUser([...users, 'Sam'])
  }

  return (
      <div> 
          <button onClick={ addNewUser }> Add New User </button>
      </div>
  );
}


export default SimpleArray;
*/



