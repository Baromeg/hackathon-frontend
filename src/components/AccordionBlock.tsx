import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { FC, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { log } from 'console'

interface Input {
  subject: string
  context: string
  intent: string
  audience: string
}
interface CustomAccordionProps {
  expanded: boolean
  onClick: (event: React.SyntheticEvent, newExpanded: boolean) => void
  heading: string
  content: string
  TypographyProps: TypographyProps
  fetchData: (input: Input) => Promise<void>
  loading: boolean
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export const CustomAccordion: FC<CustomAccordionProps> = ({
  expanded,
  onClick,
  heading,
  content,
  TypographyProps,
  fetchData,
  loading,
}) => {
  const context = localStorage.getItem('context')
  const intent = localStorage.getItem('intent')
  const audience = localStorage.getItem('audience')

  let parsedContext = '',
    parsedIntent = '',
    parsedAudience = ''

  try {
    parsedContext = context !== null ? JSON.parse(context) : ''
    parsedIntent = intent !== null ? JSON.parse(intent) : ''
    parsedAudience = audience !== null ? JSON.parse(audience) : ''
  } catch (e) {
    console.error('Error parsing JSON from local storage', e)
    // Consider handling this error more gracefully in your app
  }

  const dataToFetch = {
    subject: heading,
    context: parsedContext,
    intent: parsedIntent,
    audience: parsedAudience,
  }
  return (
    <Accordion expanded={expanded} onChange={onClick}>
      <AccordionSummary aria-controls='accordion-content' id='accordion-header'>
        <Typography {...TypographyProps}>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => {
              console.log({ context, intent, audience })

              fetchData(dataToFetch)
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Know More'}
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
