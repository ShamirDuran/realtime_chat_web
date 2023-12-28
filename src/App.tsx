import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { StylesProvider } from './context'
import { store } from './redux/store'
import router from './router'
import ThemeProvider from './theme'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StylesProvider>
          <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
