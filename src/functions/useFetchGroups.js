import { useState, useEffect } from 'react';

const useFetchGroups = (url) => {
    const[data, setData] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);    

    useEffect(() => {
        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data man!')
                }
                return res.json();
            })
            .then(data => {
                const groups = data;
                console.log("_______")
                console.log(data)
                console.log("_______")
                console.log(groups)
                console.log("_______")
                
                setData(groups)
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

export default useFetchGroups;
