import React from 'react'
import { useState } from 'react'
const Persons = ({persons}) => {
    const [userInfo,setUserInfo] = useState(persons)

    return (
        <div>
            {userInfo.map((user) => <p key = {user.id}> {user.name} {user.number}</p>)}
        </div>
    )

}

export default Persons