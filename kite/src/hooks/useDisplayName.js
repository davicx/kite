import { useDebugValue, useEffect, useState } from 'react'

function useDisplayName() {
  console.log("useDisplayName")
    const [name, setName] = useState('name')

    useEffect(() => {
      const dataName = "Frodo from database"
      setName(dataName)
    }, []);

    return name
}

export default useDisplayName

/*
import { useDebugValue, useEffect, useState } from 'react'

function useDisplayName() {
  console.log(useDisplayName)
    const [name, setName] = useState('name')

    useEffect(() => {
      async function fetchData() {
        const data = "davey";
        console.log("data" + data)
        return data

      }

      fetchData();
      //const dataName = "Frodo from database"
      //setName(dataName)
    }, []);

    return name
}

export default useDisplayName




*/

