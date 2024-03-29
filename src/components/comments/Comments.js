import CommentList from './display/CommentList';
import NewComment from './actions/NewComment';

function Comments({ api, postComments, groupID, postID, postTo, currentUser }) {
  
  return (
  <div className="">
    <p> Comments: </p>
    <CommentList api = { api } groupID = { groupID } postComments={ postComments } />
    <NewComment api = { api } postComments = {postComments} groupID = { groupID } postID = { postID } postTo = { postTo } currentUser = {currentUser}/>
  </div>
  );
}

export default Comments;

/*
<Comments api = { api } postComments = {post.commentsArray} groupID = { groupID } postID = { post.postID } currentUser = {currentUser}  /> 
    <NewPost currentUser = {currentUser} groupID = { groupID } api = { api }/>
    <Posts groupID = { groupID } api = { api }/>
    */