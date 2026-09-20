import React, { useState, useRef, useMemo } from 'react';

function Example() {   
    const [items, setItems] = useState(["first"])
    const [query, setQuery] = useState("")
    const inputRef = useRef()

    const filteredItems = useMemo(() => {
      return items.filter(item => {
        console.log(query)
        return item.toLowerCase().includes(query.toLowerCase())
      })
    
    }, [items, query])


    //PLAYGROUND
    function onChange(e) {
      const value = e.target.value;
    }
    
    function onSubmit(e) {
      e.preventDefault();
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
        <input 
          value = {query} 
          onChange= {e => setQuery(e.target.value)} 
          type="search" /> 
          <br /><br />

        <form onSubmit={onSubmit}>
            New Item: <input ref={inputRef} type="text"  />
            <button type="submit" > Add </button>
        </form>


        <h4> Items </h4>
        { items.map(item => (
            <p key={item}> { item } </p>
          ))
        }
        <h4> Filtered Items </h4>
        { filteredItems.map(item => (
            <p key={item}> { item } </p>
          ))
        }
      </div>
    );
  }

export default Example;

//WORKING 2: Better
/*
function Example() {   
    const [items, setItems] = useState(["first"])
    const [query, setQuery] = useState([""])
    const inputRef = useRef()

    const filteredItems = items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })

    //PLAYGROUND
    function onChange(e) {
      const value = e.target.value;
    }
    
    function onSubmit(e) {
      e.preventDefault();
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
        <input 
          value = {query} 
          onChange= {e => setQuery(e.target.value)} 
          type="search" /> 
          <br /><br />

        <form onSubmit={onSubmit}>
            New Item: <input ref={inputRef} type="text"  />
            <button type="submit" > Add </button>
        </form>


        <h4> Items </h4>
        { items.map(item => (
            <p key={item}> { item } </p>
          ))
        }
        <h4> Filtered Items </h4>
        { filteredItems.map(item => (
            <p key={item}> { item } </p>
          ))
        }
      </div>
    );
  }

export default Example;
*/

//WORKING
/*
function Example() {   
    const [items, setItems] = useState(["first"])
    const inputRef = useRef()

    //PLAYGROUND
    console.log("test")

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

*/