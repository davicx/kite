import CommentList from './display/CommentList';
import NewComment from './actions/NewComment';

function Comments({ api, postComments, groupID, postID, currentUser }) {
  
  return (
  <div className="">
    <p> Comments: </p>
    <CommentList groupID = { groupID } api = { api }/>
    <NewComment api = { api } postComments = {postComments} groupID = { groupID } postID = { postID } currentUser = {currentUser}/>

  </div>
  );
}

export default Comments;

/*
<Comments api = { api } postComments = {post.commentsArray} groupID = { groupID } postID = { post.postID } currentUser = {currentUser}  /> 
    <NewPost currentUser = {currentUser} groupID = { groupID } api = { api }/>
    <Posts groupID = { groupID } api = { api }/>
    */