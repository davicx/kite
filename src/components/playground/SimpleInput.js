import React, { useState } from 'react'


const SimpleInput = () => {
    const [name, setName] = useState("")

    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
    )
}

export default SimpleInput;
