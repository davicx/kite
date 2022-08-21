//import { useState, useEffect } from 'react';
/*
import IndividualPost from './sort/IndividualPost';
//import useFetch from './useFetch';
import fetchPosts from './sort/useFetchPosts';

const Posts = () => {
  const { data, isPending, error } = fetchPosts('http://localhost:3003/posts/group/77')
  const currentPosts = data;

  return (
    <div className="posts">
      { error && <div> { error } </div>}
      { isPending && <div> loading... </div>}
      { currentPosts && <IndividualPost posts = { currentPosts } title="The posts!" />}
    </div>
    );
  }
  
  export default Posts;
*/
  /*

  handleDelete={ handleDelete } 
      const handleDelete = (postID) => {
        console.log(postID)
        const updatedPosts = currentPosts.filter(post => post.postID !== postID);
        setPosts(updatedPosts);
    }
            {isPending && <div> loading... </div>}
  <IndividualPost posts={ currentPosts } title="The Posts!" handleDelete={handleDelete} /><hr />
   
      useEffect(() =>{
        console.log("use effect loaded posts!")
        fetch('http://localhost:3003/posts')
        .then(res => {
            return res.json()
        })
        .then(data => {
            setPosts(data);
            setIsPending(false);
        })
    }, []);

    return (
        <div className="posts">
            {isPending && <div> loading... </div>}
            {posts && <AllPosts posts = {posts} title="all the posts" handleDelete={handleDelete} />}
        </div>
        );
    } 
  */

  /*
    let databasePosts = [
        {postCaption: 'hiya!', postFrom: 'davey', postTo: 'sam', postLiked: 'liked', postID: 1},
        {postCaption: 'lets garden!', postFrom: 'frodo', postTo: 'sam', postLiked: 'like me', postID: 2},
        {postCaption: 'and hike!', postFrom: 'sam', postTo: 'davey',  postLiked: 'liked', postID: 3},
        {postCaption: 'and hike tonight!', postFrom: 'davey', postTo: 'sam', postLiked: 'like me', postID: 4}
    ]

  */