import React, { useState } from 'react'


const RemoveGroupUser = ({removeGroupUser, user }) => {
  let userName = user.friendName

  return (
      <div> 
        <div className=''> 
          <p> {userName} </p>
          <button onClick={() => removeGroupUser(user)}>Remove Me | {userName}</button>
        </div>
      </div>
  );
}


export default RemoveGroupUser;

