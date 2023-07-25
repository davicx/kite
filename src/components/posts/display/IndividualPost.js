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

