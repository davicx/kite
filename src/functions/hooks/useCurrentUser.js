import { useEffect, useState } from 'react'

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState('no one')

    useEffect(() => {
      const dataName = "Frodo from database"
      setCurrentUser(dataName)
    }, []);

    return currentUser
}

export default useCurrentUser