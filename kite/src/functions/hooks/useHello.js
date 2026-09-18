import { useEffect } from 'react'

function useHello() {
  const hello = "hello"

    return { hello }
}

export default useHello

/*
import { useDebugValue, useEffect, useState } from 'react'

function useDisplayName() {
    const [name, setName] = useState('name')

    useEffect(() => {
      const dataName = "Frodo from database"
      setName(dataName)
    }, []);

    return name
}

export default useDisplayName
*/
/*
import { useState, useEffect } from 'react';

const useFetchPosts = (postsURL) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(postsURL)
      .then(res => {
        if (!res.ok) { 
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [postsURL])

  return { data, isPending, error };
}
 
export default useFetchPosts;
*/
//DEBUG
/*
function useDisplayName() {
    const [name, setName] = useState('name')

    useEffect(() => {
      const dataName = "Frodo from database"
      setName(dataName)
    }, []);

    useDebugValue(name ?? '... loading!')

    return name
}
*/
