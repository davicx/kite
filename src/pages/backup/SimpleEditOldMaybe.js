import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom" 
import useLoginStatus from '../../functions/hooks/useLoginStatus';
import functions from "../../functions/functions";

import axios from 'axios'

function Playground() {
  const [postCaption, editPostCaption] = useState('Hi Edit Me! Wanna go on a hike today the weather is perfect!')
  const [postCaptionArea, showPostCaption] = useState('show')
  const [editPostArea, showEditPost] = useState('hide')
  
  //POST AREA
  function handleEditPostSubmit() {
    showPostCaption('hide')
    showEditPost('show')
  }
  
  //EDIT AREA
  const handleChange = (event) => {
    const { name, value } = event.target
    editPostCaption(value)
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const { name, value } = event.target
      showPostCaption('show')
      showEditPost('hide')
  }

  return (
    <div className="user">
      <div className = {postCaptionArea}> 
        <p>{ postCaption } </p>
        <button className="" onClick={() => handleEditPostSubmit() }> Edit Post </button>  
      </div>

      <div className = {editPostArea}> 
        <form onSubmit={ handleSubmit }>
          <label> </label>
          <textarea value={ postCaption } onChange={ handleChange } />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default Playground;
