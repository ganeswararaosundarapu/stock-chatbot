import React from 'react'

interface DynamicRendererProps {
    render: JSX.Element
    isUser: boolean
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ render, isUser }) => {
    return (
        <div className={`message ${isUser ? 'user' : 'bot'}`}>
            {!isUser && (
                <img className='bot-icon' src="./chatbot-msg.png" />
            )}
            <div>{render}</div>
        </div>
    )
}

export default DynamicRenderer