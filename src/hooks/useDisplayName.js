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
