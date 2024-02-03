import React, { useState } from 'react'


const IndividualGroupUser = ({addGroupUser, removeGroupUser, user }) => {
  let userID = user.userID
  let userName = user.userName

  return (
      <div> 
        <div className=''> 
          <p> {userID } | {userName} </p>
          <button onClick={() => removeGroupUser(userName)}>Remove Me | {userName}</button>
        </div>
      </div>
  );
}


export default IndividualGroupUser;

