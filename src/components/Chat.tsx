import { FC, useEffect, useState } from 'react'
import hackathon from '../hackathon.png'
import Results from './Results'
import axios, { AxiosResponse } from 'axios'
import Form from './Form'
import { Flex } from 'theme-ui'

interface Input {
  subject: string
  context: string
  intent: string
  audience: string
}

interface Result {
  coveringPoints: string[]
  pointDetails: { [key: string]: string }
  realWorld: { [key: string]: string }
}

const Chat: FC = () => {
  const [input, setInput] = useState<Input>({
    subject: '',
    context: '',
    intent: '',
    audience: '',
  })

  const [response, setResponse] = useState<Result>({
    coveringPoints: [
      'Right Triangle Trigonometry',
      'Trigonometric Ratios',
      'Trigonometric Functions',
      'Angle Measurement',
    ],
    pointDetails: {
      'Right Triangle Trigonometry':
        'Right triangle trigonometry is the study of triangles that have one right angle. The sides of a right triangle are referred to as the opposite side, the adjacent side, and the hypotenuse.',
      'Trigonometric Ratios':
        'Trigonometric ratios are the ratios of the sides of a right triangle that are used to calculate angles and distances in a triangle. They are sine, cosine, and tangent.',
      'Trigonometric Functions':
        'Trigonometric functions are mathematical functions that are used to calculate angles and distances in a triangle. They are sine, cosine, and tangent.',
      'Angle Measurement':
        'Angle measurement is the process of measuring the size of an angle. The most common unit of measure is the degree, but angles can also be measured in radians.',
    },
    realWorld: {
      'Calculating the Height of a Building':
        'The height of a building can be calculated using trigonometry. If the angle of elevation from the ground to the top of the building is known, the height of the building can be calculated using the trigonometric ratio of sine.',
      Navigation:
        'Trigonometry is used in navigation to calculate distances and angles between two points. By using a map and the trigonometric ratios of sine and cosine, navigators can calculate the distance and angle between two points.',
    },
  })
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (input: Input) => {
    setLoading(true)

    try {
      const response: AxiosResponse<Result> = await axios.post(
        'http://localhost:3001/api/prompt',
        input
      )
      setResponse(response.data)
    } catch (error: any) {
      setError(error)
    }

    setLoading(false)
  }

  const sendMessage = () => {
    fetchData(input)
  }
  if (loading) {
    return <div>Loading...</div>
  }

  const handleInputChange = (data: Input) => {
    console.log(data)

    fetchData(data)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Hey Adventurer! </h1>
        <div>
          <img src={hackathon} alt='hackathon' style={{ height: '100px' }} />
        </div>
        <h2>What would you like to learn?</h2>
        {/* {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.user}: </strong>
            {message.message}
          </p>
        ))} */}
      </div>
      {/* <div>



      <input
        name='subject'
        value={input.subject}
        onChange={handleInputChange}
        type='text'
        placeholder='Subject'
      />

      <input
        name='level'
        value={input.level}
        onChange={handleInputChange}
        type='text'
        placeholder='Level'
      />

      <input
        name='method'
        value={input.method}
        onChange={handleInputChange}
        type='text'
        placeholder='Method'
      />

</div> */}

      <Form handleInputChange={handleInputChange} />
      <button onClick={sendMessage}>Send</button>

      {response !== null && <Results response={response} />}
    </div>
  )
}

export default Chat
