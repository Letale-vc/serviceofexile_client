import App from './App'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { themes } from './themes'

render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
