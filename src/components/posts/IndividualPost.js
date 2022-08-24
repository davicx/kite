const IndividualPost = (props) => {
    const posts = props.posts;
    const title = props.title;

    const likePost = (e) => {
        console.log("you liked!");
        console.log(e);
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

export default IndividualPost;

/*
const App = () => {
  const arr = ['Austria', 'Belgium', 'Canada'];

  const handleClick = (event, key) => {
    console.log(event.target);
    console.log('key index: ', key);
  };

  return (
    <div>
      {arr.map((element, key) => (
        <div onClick={event => handleClick(event, key)} key={key}>
          {element}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;

*/