import React, { useState, useRef, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from "./components/SearchResultsList";


function AutoComplete() {   
  const [results, setResults] = useState([]);
  console.log(results)

    return (
      <div className = "login">
        <p> Search Here </p>
        <div className = "search-bar-container"> 
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} />}
          <div> Results </div>
        </div>
      </div>
    );
  }

export default AutoComplete;




//WORKING 2: Better
/*
        <SearchBar setResults={setResults} />
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