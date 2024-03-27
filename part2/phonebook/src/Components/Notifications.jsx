import react from 'react'

const Notification = ({message,headerStyle}) => {
    return (
        <div className = {headerStyle}>
            {message}
        </div>
    )
}
export default Notification