import React, { useState, useEffect } from 'react'


//SIMPLE: Call
const SimpleUseEffect = ({ user }) => {
    const [resourceType, setResourceType] = useState('posts');

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/" + resourceType)
        .then(response => response.json()).then()
        .then(json => console.log(json))
    }, [resourceType])
  
    return (
        <div className='post'> 
            <button onClick={() => setResourceType ('posts' )}>Posts</button>
            <button onClick={() => setResourceType ('users' )}>Users</button>
            <button onClick={() => setResourceType ('comments' )}>Comments</button>
            <p> { resourceType } </p>
        </div>
    );
  }
export default SimpleUseEffect; 

//SIMPLE: Window Resize
/*
const SimpleUseEffect = ({ user }) => {
    const [windowWidth, setwindowWidth] = useState (window. innerWidth)

    const handleResize = () => {
        setwindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener ('resize', handleResize)
        
        return () => {
            window.removeEventListener('resize' , handleResize)
        }
    }, [])

  
    return (
        <div className='post'> 
            <p> {windowWidth} </p>
        </div>
    );
  }
export default SimpleUseEffect;
*/

//SIMPLE: Each Type
/*
const SimpleUseEffect = ({ user }) => {
    const [resourceType, setResourceType] = useState('posts');
    console.log("Render!")

    useEffect(() => {
        console.log("on Mount!")
    }, [])
  
    useEffect(() => {
        console.log("resourceType changed!")
    }, [resourceType])
  
    return (
        <div className='post'> 
            <button onClick={() => setResourceType ('posts' )}>Posts</button>
            <button onClick={() => setResourceType ('users' )}>Users</button>
            <button onClick={() => setResourceType ('comments' )}>Comments</button>
            <p> { resourceType } </p>
        </div>
    );
  }
  
  export default SimpleUseEffect;

*/