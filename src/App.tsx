import './App.css'
import { ThemeUIProvider } from 'theme-ui'

import Chat from './components/Chat'
// import Results from './components/Results'
import { ThemeProvider } from '@mui/material/styles'
// import { AnotherThemeProvider } from 'another-ui-library';
import {
  createTheme as materialCreateTheme,
  THEME_ID,
} from '@mui/material/styles'

const themeUITheme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
}

const materialTheme = materialCreateTheme()
function App() {
  return (
    <ThemeUIProvider theme={themeUITheme}>
      <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <div className='App'>
          <Chat />
          {/* <Results /> */}
        </div>
      </ThemeProvider>
    </ThemeUIProvider>
  )
}

export default App
