import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import useUpdateLogger from '../../hooks/useUpdateLogger';

const SimpleSubmitButton = ({ currentUser, api }) => {
  const [postCaption, editPostCaption] = useState('Hi Edit Me! Wanna go on a hike today the weather is perfect!')

  const handleChange = (event) => {
    const { name, value } = event.target
    editPostCaption(value)
  }

  //SUBMIT
  const handleSubmit = (event) => {
      event.preventDefault();
      const { name, value } = event.target
      console.log(postCaption)
  }

  return (
      <div> 
        <form onSubmit={ handleSubmit }>
          <label> </label>
          <textarea rows="4" cols="50" value={ postCaption } onChange={ handleChange } />
          <p> {postCaption} </p>
          <button type="submit"> Submit </button>
        </form>
      </div>
  );
}


export default SimpleSubmitButton;



