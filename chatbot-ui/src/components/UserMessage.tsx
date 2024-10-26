import React from 'react'

interface UserMessageProps {
    text: string
}

const UserMessage: React.FC<UserMessageProps> = ({ text }) => {
    return (
        <div>
            <span>{text}</span>
        </div>
    )
}

export default UserMessage