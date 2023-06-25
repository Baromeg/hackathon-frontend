import { FC, useState } from 'react'
import { CustomAccordion } from './AccordionBlock'

interface ResultProps {
  response: {
    coveringPoints: string[]
    pointDetails: { [key: string]: string }
    realWorld: { [key: string]: string }
  }
}

const Results: FC<ResultProps> = (props) => {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const coveringPoints = props.response.coveringPoints
  const pointDetails = props.response.pointDetails
  const realWorld = props.response.realWorld

  return (
    <div className='container'>
      <h3>Topics</h3>

      {coveringPoints &&
        Object.entries(pointDetails).map(([key, value]) => (
          <CustomAccordion
            expanded={expanded === key}
            onClick={handleChange(key)}
            heading={key}
            content={value}
            TypographyProps={{ variant: 'body1' }}
          />
        ))}
      <h3>Real world examples</h3>
      {coveringPoints &&
        Object.entries(realWorld).map(([key, value]) => (
          <CustomAccordion
            expanded={expanded === key}
            onClick={handleChange(key)}
            heading={key}
            content={value}
            TypographyProps={{ variant: 'body1' }}
          />
        ))}
    </div>
  )
}

export default Results
