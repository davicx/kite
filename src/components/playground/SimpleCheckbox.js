import React, { useState } from 'react';

function SimpleCheckbox() {
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
  
  export default SimpleCheckbox;
  