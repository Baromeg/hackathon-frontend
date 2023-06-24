import React, { useState } from 'react'
import hackathon from './hackathon.png'

interface Message {
  user: string
  message: string
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    setMessages([...messages, { user: 'User', message: input }])
    setInput('')
  }

  return (
    <div>
      <div>
        <img src={hackathon} alt='hackathon' style={{ height: '100px' }} />
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.user}: </strong>
            {message.message}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='text'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat
