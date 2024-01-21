import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import useUpdateLogger from '../../hooks/useUpdateLogger';

const SimpleButtonChild = ({ user, handleClicking, handleDelete }) => {
  let userID = user.userID
  let userName = user.userName

  return (
      <div> 
        <p> {userID } | {userName} </p>
        <button onClick={() => handleClicking(userID)}>Click Me {userName}</button>
        <button onClick={() => handleDelete(userID)}>Delete Me {userName}</button>
      </div>
  );
}


export default SimpleButtonChild;



