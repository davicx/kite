import React, { useState, useEffect } from 'react'


const SimpleSaveToStateAPI = () => {
    const [users, setUserArray] = useState([])

    useEffect(() => {
      fetch('http://localhost:3003/users/all/')
      .then(response => response.json())
      .then(json => {
        //console.log(json.userArray);
        setUserArray(json.userArray);
    })
      //  setPostArray([{name: 'a'}, {name: 'b'},{name: 'c'}])
  },[])
  
  console.log(users)
    return (
      <div className="App">
        <p> Hi </p>
        {users && users.map((user) => (
            <p> User: {user.userName } || Friend: {user.friendName}</p>
          ))} 
      </div>
    );
}


export default SimpleSaveToStateAPI;

