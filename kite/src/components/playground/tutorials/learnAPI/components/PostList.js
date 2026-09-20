const PostList = ({ posts}) => {
    return (
      <div className="blog-list">
        {posts.map(post => (
          <div key={post.postID} >
            <p>{ post.postCaption}</p>
          </div>
        ))}
      </div>
    );
  }
   
  export default PostList;