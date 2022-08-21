const IndividualPost = (props) => {
    const posts = props.posts;
    const title = props.title;
    
    //console.log(posts[0]);
    return (
        <div className = "post-list">
            <h4> { title } </h4>
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} </p>                  
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;

/*
const handleDelete = props.handleDelete;
<button onClick= {()=> handleDelete(post.postID)}> delete post </button><br />     
*/
