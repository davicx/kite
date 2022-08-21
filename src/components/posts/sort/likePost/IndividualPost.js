const IndividualPost = (props) => {
    const posts = props.posts;
    const title = props.title;
    const handleDelete = props.handleDelete;
    const likePost = props.likePost;
  
    return (
        <div className = "post-list">
            <h4> { title } </h4>
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postFrom } | { post.postTo} | { post.postLiked } </p>  
                    <button onClick= {()=> handleDelete(post.postID)}> delete post </button><br />          
                    <button onClick= {()=> likePost(post.postID)}> like post </button>              
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;


//OTHER WAY
/*
const IndividualPost = ({ posts, title}) => {
    return (
        <div className = "post-list">
            <h4> { title } </h4>
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postFrom } | { post.postTo} </p>             
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;
*/
