import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { StylesProvider } from './providers'
import { store } from './redux/store'
import router from './router'
import ThemeProvider from './theme'
import { Toaster } from 'sonner'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StylesProvider>
          <>
            <Toaster position='bottom-right' richColors />
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
          </>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
