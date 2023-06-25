import { ChangeEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextField,
  Button,
  CircularProgress,
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
const Form: FC<FormProps> = ({ handleInputChange, loading }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    handleInputChange(data)
  }

  return (
    <div
      className='container'
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
            <TextField {...field} label='Subject' variant='standard' required />
          )}
        />
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Context</FormLabel>
            <Controller
              name='context'
              control={control}
              defaultValue=''
              rules={{ required: 'Context is required' }}
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
            {errors.context && (
              <span style={{ color: 'red' }}>{errors.context.message}</span>
            )}
          </FormControl>
        </div>
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Intent</FormLabel>
            <Controller
              name='intent'
              control={control}
              defaultValue=''
              rules={{ required: 'Intent is required' }}
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
            {errors.intent && (
              <span style={{ color: 'red' }}>{errors.intent.message}</span>
            )}
          </FormControl>
        </div>
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Audience</FormLabel>
            <Controller
              name='audience'
              control={control}
              defaultValue=''
              rules={{ required: 'Audience is required' }}
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
            {errors.audience && (
              <span style={{ color: 'red' }}>{errors.audience.message}</span>
            )}
          </FormControl>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default Form
