import Likes from '../actions/like/Likes';
import EditPost from '../actions/EditPost';
import DeletePost from '../actions/DeletePost';
import Comments from '../../comments/CommentList';

const IndividualPost = ({api, post, currentUser, groupID }) => {
    return (     
        <div className="post" >
            <p className = "post-text"> Post Type { post.postType } </p>
            <p className = "post-text"> { post.postCaption } </p>
            <p className = "post-text"> POST ID: { post.postID } |  { post.postFrom } | { post.postTo} | GROUP ID: { post.groupID }</p>  
            <Comments api = { api } postComments = {post.commentsArray} groupID = { groupID } postID = { post.postID } currentUser = {currentUser}  /> 
        </div>       
        );
    }  

export default IndividualPost;

/*

//This is part of this just removed to make it easier! 
            <Likes groupID = { groupID } post = { post } currentUser = {currentUser}  />    
            <DeletePost groupID = { groupID } currentUser = {currentUser} postID = { post.postID }  />           
            <EditPost groupID = { groupID } currentUser = {currentUser} postID = { post.postID }  />  

*/               