const IndividualPosts = (props) => {
    const posts = props.posts;

    const title = props.title;

    const likePost = (e) => {
      console.log(e.target);
      console.log("you liked! ");
    }

    return (
        <div className = "post-list">
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>      
                    <button onClick={ likePost }> Like </button>                         
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPosts;

