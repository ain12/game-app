import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface MessageBubbleProps {
  name: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ name }) => {
  return (
    <div className="fixed right-5 top-5 px-6 py-4 rounded-lg text-white bg-[#22bb33] shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-[1000] animate-[fadeInOut_3s_ease-in-out] ">
      <span className='font-bold'>{name}</span>, your message has been sent successfully <FontAwesomeIcon icon={faCheck} />
    </div>
  )
}

export default MessageBubble