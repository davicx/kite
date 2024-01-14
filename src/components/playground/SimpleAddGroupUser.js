import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import useUpdateLogger from '../../hooks/useUpdateLogger';

const SimpleAddGroupUsers= ({ currentUser, api }) => {
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


export default SimpleAddGroupUsers;




//APPENDIX
/*
const SimpleAddLocalStorage = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    //POST AREA
    const handleChange = (event) => {
      const { name, value } = event.target
      console.log(value)
      console.log(name)
  
      setIsChecked(!isChecked);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hi")
    }
  
    return (
      <div className="user">
          <form onSubmit={ handleSubmit }>
          <div className="topping">
          <input type="checkbox" id="user" name="user" value="Sam" checked={isChecked} onChange={handleChange} /> Sam
        </div>
            <p> is checked: {isChecked ? "checked" : "un-checked"}</p>
            <button type="submit"> Submit </button>
          </form>
      </div>
    );
}

export default SimpleAddLocalStorage;
*/