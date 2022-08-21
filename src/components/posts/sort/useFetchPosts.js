import { useState, useEffect } from 'react';

const useFetchPosts = (url) => {
    const[data, setData] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);    

    useEffect(() => {
        fetch(url)
            .then(res => {
             //console.log(res);
                if(!res.ok) {
                    throw Error('could not fetch the data man!')
                }
                return res.json();
            })
            .then(data => {
      
                const posts = data.posts;
                console.log("______")
                console.log(data)
                console.log(posts)
                console.log("_______")
                setData(posts)
                setIsPending(false);
                setError(null);
                })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            })
        }, [url]);

        return { data, isPending, error }
}

export default useFetchPosts;
