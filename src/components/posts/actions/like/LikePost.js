import React, { useState, useContext } from 'react';

function LikePost(props) {
  const currentUser = props.currentUser;
  const postUserLikesArray = props.post.likedByUsernameArray;
  const postID = props.post.postID;
  console.log(postID)
  console.log(currentUser)
  console.log(postUserLikesArray)

  const handleLikePost = (postID, currentUser) => {
    var likedPost = {
        postID: postID,
        likedBy: currentUser   
    }
    console.log(currentUser)
    console.log(postUserLikesArray)
}

  return (
    <div className="">
        <p>Like Me!</p> 
        { postUserLikesArray.includes(currentUser) ? 
            <button type="submit" className = "post-liked" onClick={() => { handleLikePost(postID, currentUser) }}>UnLike Me! </button>: 
            <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}> Like Me!</button>
        }
    </div>
  );
}


export default LikePost;


//<LikePost likes = { postUserLikesArray } currentUser = {currentUser} />