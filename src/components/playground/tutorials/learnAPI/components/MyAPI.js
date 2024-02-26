import React, { useState, useEffect } from 'react'
import PostList from './PostList';
import useFetch from "../hooks/useFetch";

//http://localhost:3003/simple/posts
//https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-17/dojo-blog/src/Home.js

function MyAPI() {
    const { data: posts, isPending, error } = useFetch("http://localhost:3003/simple/posts")

    return (
        <div> 
            <ul> 
              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              {posts && <PostList posts = {posts}/> }
            </ul>
        </div>
    );
}

export default MyAPI;






//WORKS 2
/*
import React, { useState, useEffect } from 'react'
import PostList from './PostList';
import useFetch from "../hooks/useFetch";

//http://localhost:3003/simple/posts
//https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-17/dojo-blog/src/Home.js

function MyAPI() {
    const [posts, setPosts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch('http://localhost:3003/simple/posts')
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          } 
          console.log(res)
          return res.json();
        })
        .then(data => {
            setPosts(data);
            setIsPending(false);
            setError(null)
            console.log(data)
        })
        .catch(err => {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        })
    }, [])

      return (
        <div> 
            <ul> 
              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              {posts && <PostList posts = {posts}/> }
            </ul>
        </div>
    );
}

export default MyAPI;
*/
//WORKS
/*

function MyAPI() {
    const [posts, setPosts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch('http://localhost:3003/simple/posts')
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          } 
          console.log(res)
          return res.json();
        })
        .then(data => {
            setPosts(data);
            setIsPending(false);
            setError(null)
            console.log(data)
        })
        .catch(err => {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        })
    }, [])

      return (
        <div> 
            <ul> 
              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              {posts && <PostList posts = {posts}/> }
            </ul>
        </div>
    );
}

export default MyAPI;
*/

//APPENDIX
/*
    const handleClick = (postID) => {
      console.log(postID)
    }
    

              {posts && 
                posts.map((post) => {
                  return <li key = {post.postID}> { post.postCaption } </li>
                })
              }

  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(data);
      })
  }, [])

  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
  */


//WORKING 2
/*
import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/test-utils';

function Activities() {
    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function loadActivity() {
        setIsLoading(true);
        fetch("https://www.boredapi.com/api/activity")
        .then((response) => response.json())
        .then((data) => {
            setActivity([...activity, data]);
            setIsLoading(false)
        });
    }

    useEffect(() => {
        loadActivity()
      }, []);

      if(activity.length === 0) {
        return <p> loading...</p>
      }

      return (
        <div> 
            <ul> 
                {activity.map((currentActivity) => {
                    return <li key = {currentActivity.key}> { currentActivity.activity } </li>
                })}
            </ul>
          <button disabled={isLoading} onClick={loadActivity}> Add One </button>
        </div>
    );
}

export default Activities;

*/

//WORKING
/*
import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/test-utils';

function Activities() {
    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function loadActivity() {
        setIsLoading(true);
        fetch("https://www.boredapi.com/api/activity")
        .then((response) => response.json())
        .then((data) => {
            setActivity([...activity, data]);
            setIsLoading(false)
        });
    }

    useEffect(() => {
        loadActivity()
      }, []);

      if(isLoading) {
        return <p> loading...</p>
      }

      return (
        <div> 
            <ul> 
                {activity.map((currentActivity) => {
                    return <li key = {currentActivity.key}> { currentActivity.activity } </li>
                })}
            </ul>
          <button onClick={loadActivity}> Add One </button>
        </div>
    );
}

export default Activities;
*/



/*
function MyAPI() {
    const [posts, setPosts] = useState(null)

    const handleClick = (postID) => {
      console.log(postID)
    }
    
    useEffect(() => {
      fetch('http://localhost:3003/simple/posts')
        .then(res => {
          return res.json();
        })
        .then(data => {
            setPosts(data);
            console.log(data)
        })
    }, [])
  
      return (
        <div> 
            <ul> 
              {posts && <PostList posts = {posts}/> }
            </ul>
        </div>
    );
}

export default MyAPI;

*/