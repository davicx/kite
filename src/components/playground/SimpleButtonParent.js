import React, { useState } from 'react'

import SimpleButtonChild from './SimpleButtonChild'

let david = {
  userID: 1,
  userName: "david",
}
let sam = {
  userID: 2,
  userName: "sam",
}
let frodo = {
  userID: 3,
  userName: "frodo",
}

let usersArray = [david, sam, frodo]


const SimpleButtonParent = () => {
    const [users, removeUser] = useState(usersArray)

    const handleDelete = (userID) => {
      const newUsers = users.filter(user => user.userID !== userID);
      removeUser(newUsers)
    }

    const handleClicking = (userID) => {
      console.log("You clicked " + userID)
    }

  return (
      <div>
          <p> hi </p>
          {users.map((user) => (
              <SimpleButtonChild key = { user.userID } user = {user} handleClicking={ handleClicking } handleDelete={ handleDelete }/>
          ))} 
      </div>
  )
}

export default SimpleButtonParent;

