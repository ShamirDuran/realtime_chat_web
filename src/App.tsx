import { RouterProvider } from 'react-router-dom'
import router from './router'
import ThemeProvider from './theme'
import { ConstantsProvider } from './context'

function App() {
  return (
    <ThemeProvider>
      <ConstantsProvider>
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </ConstantsProvider>
    </ThemeProvider>
  )
}

export default App
