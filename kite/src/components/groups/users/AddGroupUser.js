import React, { useState } from 'react'


const AddGroupUser = ({addGroupUser, user }) => {
  let userName = user.friendName

  return (
      <div> 
        <div className=''> 
          <p> {userName} </p>
          <button onClick={() => addGroupUser(user)}>Add Me | {userName}</button>
        </div>
      </div>
  );
}


export default AddGroupUser;

