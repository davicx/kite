import Likes from '../actions/like/Likes';
import EditPost from '../actions/EditPost';
import DeletePost from '../actions/DeletePost';
import Comments from '../../comments/Comments';

//LIKES: groupID, post, currentUser
const SimpleIndividualPost = ( {post} ) => {
    return (     
        <div className="post" >
            <h4 className = "post-text"> Post ID { post.postID } </h4>
            <p className = "post-text"> Post Caption { post.postCaption } </p>
        </div>       
        );
    }  

export default SimpleIndividualPost;

