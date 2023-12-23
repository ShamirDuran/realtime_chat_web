import { RouterProvider } from 'react-router-dom'
import { StylesProvider } from './context'
import router from './router'
import ThemeProvider from './theme'

function App() {
  return (
    <ThemeProvider>
      <StylesProvider>
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
