import { FC } from 'react'

interface ResultProps {
  response: {
    coveringPoints: string[]
    pointDetails: { [key: string]: string }
    realWorld: { [key: string]: string }
  }
}

const Results: FC<ResultProps> = (props) => {
  const coveringPoints = props.response.coveringPoints
  const pointDetails = props.response.pointDetails
  const realWorld = props.response.realWorld

  return (
    <div>
      <div>
        {coveringPoints &&
          coveringPoints.map((topic, index) => (
            <p key={index}>
              <strong>{topic} </strong>
            </p>
          ))}
      </div>
      <div>
        {coveringPoints &&
          Object.entries(pointDetails).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
      </div>

      <div>
        {coveringPoints &&
          Object.entries(realWorld).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
      </div>
    </div>
  )
}

export default Results
