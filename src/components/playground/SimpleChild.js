import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import useUpdateLogger from '../../hooks/useUpdateLogger';

const SimpleChild = ({ user }) => {
  let userID = user.userID
  let userName = user.userName

  return (
      <div> 
        <p> {userID } | {userName} </p>
      </div>
  );
}


export default SimpleChild;



