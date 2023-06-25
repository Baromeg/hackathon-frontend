import React, { ChangeEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextField,
  Slider,
  Button,
} from '@mui/material'

type FormData = {
  subject: string
  context: string
  intent: string
  audience: string
}

interface FormProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}
// @ts-ignore: Unreachable code error
const Form: FC<FormProps> = ({ handleInputChange }) => {
  const { handleSubmit, control } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    handleInputChange(data)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '90%',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='subject'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField {...field} label='Subject' variant='outlined' required />
          )}
        />
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Context</FormLabel>
            <Controller
              name='context'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value='Academic'
                    control={<Radio />}
                    label='Academic'
                  />
                  <FormControlLabel
                    value='General'
                    control={<Radio />}
                    label='General'
                  />
                  <FormControlLabel
                    value='Creative'
                    control={<Radio />}
                    label='Creative'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Intent</FormLabel>
            <Controller
              name='intent'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value='Teach'
                    control={<Radio />}
                    label='Teach'
                  />
                  <FormControlLabel
                    value='Self-Study'
                    control={<Radio />}
                    label='Self-Study'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Audience</FormLabel>
            <Controller
              name='audience'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value='Beginner'
                    control={<Radio />}
                    label='Beginner'
                  />
                  <FormControlLabel
                    value='Knowledgable'
                    control={<Radio />}
                    label='Knowledgable'
                  />
                  <FormControlLabel
                    value='Expert'
                    control={<Radio />}
                    label='Expert'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>

        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Form
