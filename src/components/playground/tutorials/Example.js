import React, { useState, useRef } from 'react';

function Example() {   
    const [items, setItems] = useState(["first"])
    const inputRef = useRef()

    function onSubmit(e) {
      e.preventDefault();
      console.log("submit")
      console.log(items)
      let value = inputRef.current.value;
      
      //value = "hi"
      if(value === "") {
        console.log("empty")
        return ;
      } else {
        setItems(prev => {
          return [...prev, value]
        })
      }  
      inputRef.current.value = ""
    } 



    return (
      <div className = "login">
        <p> Search </p>
        <input type="search" /> <br /><br />

        <form onSubmit={onSubmit}>
            New Item: <input ref={inputRef} type="text"  />
            <button type="submit" > Add </button>
        </form>


        <h4> Items </h4>
        { items.map(item => (
            <p key={item}> { item } </p>
          ))
        }
      </div>
    );
  }

export default Example;

