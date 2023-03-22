import Likes from '../actions/like/Likes';
import EditPost from '../actions/EditPost';
import DeletePost from '../actions/DeletePost';

const IndividualPost = ({post, currentUser, groupID }) => {
    return (     
        <div className="post" >
            <p className = "post-text"> Post Type { post.postType } </p>
            <p className = "post-text"> { post.postCaption } </p>
            <p className = "post-text"> POST ID: { post.postID } |  { post.postFrom } | { post.postTo} | GROUP ID: { post.groupID }</p>  
            <Likes groupID = { groupID } post = { post } currentUser = {currentUser}  />    
            <DeletePost groupID = { groupID } currentUser = {currentUser} postID = { post.postID }  />           
        </div>       
        );
    }  

export default IndividualPost;
