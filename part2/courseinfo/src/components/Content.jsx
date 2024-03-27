import React from 'react'

const Content = ({parts}) => {
    const sum = parts.reduce( (total,part) => {
        return total + part.exercises
    },0)
    return (
        <div>
            <div>
            {parts.map((part) => <p key = {part.id}>{part.name} {part.exercises}</p>)}

            </div>

            <div>
                <h3>total of {sum} exercises</h3>
            </div>


        </div>
       
    )
}
export default Content