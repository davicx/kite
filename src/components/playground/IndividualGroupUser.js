import React, { useState } from 'react'


const IndividualGroupUser = ({addNewGroupUser, removeNewGroupUser, user }) => {
  let userID = user.userID
  let userName = user.userName

  return (
      <div> 
        <div className=''> 
          <p> {userID } | {userName} </p>
          <button onClick={() => addNewGroupUser(userName)}>Add Me to your Group | {userName}</button>
          <button onClick={() => removeNewGroupUser(userName)}>Remove Me | {userName}</button>
        </div>
      </div>
  );
}


export default IndividualGroupUser;

