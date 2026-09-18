import React from 'react';
import { useQuery } from "react-query";
import IndividualComment from './IndividualComment';
//<CommentList groupID = { groupID } postComments={ postComments } api = { api }/>
//api = { api } postComments = {post.commentsArray} groupID = { groupID } postID = { post.postID } currentUser = {currentUser}
const CommentList = ({api, groupID, postComments}) => {
  return (
    <div className="posts">
        <p><b> Comments</b> </p>
        <div className = "post-list" >
        {postComments && postComments.map((comment) => (
              <IndividualComment api = { api } comment = { comment }  groupID = { groupID }  key = { comment.commentID }/>
            ))}
        </div>
    </div>
  );
  }
  
export default CommentList;




//BACKUP
/*
import React from 'react';
import { useQuery } from "react-query";
import IndividualComment from './IndividualComment';

//<Comments api = { api } groupID = { groupID } postID = { post.postID } currentUser = {currentUser}  /> 


async function getComments(postID, api) {
    const commentPostURL = "http://localhost:3003/comments/" + postID; 
    const response = await api.get(commentPostURL)
    //console.log("response")
    //console.log(response)
    //console.log("response")
  
    return response.data
  
} 


//This does not need API just send as a prop
const CommentList = ({api, groupID, postComments, postID}) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    //console.log("Posts: Getting Comments for the post " + postID)

    
    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['post-comments', postID], () => getComments(postID, api), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    const currentPosts = data;
    
//<IndividualComment api = { api } post = { post }  groupID = { groupID } currentUser = {currentUser} key = { post.postID }/>
  return (
  <div className="posts">
       <p><b> Comments</b> </p>
       <div className = "post-list" >
       {postComments && postComments.map((comment) => (
            <IndividualComment api = { api } comment = { comment }  groupID = { groupID }  key = { comment.commentID }/>
          ))}
       </div>
  </div>
  );
  }
  
export default CommentList;
*/
