import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom'
import { DashboardPage, LoginPage, NotFound, RegisterPage, VerifyAccount } from '../pages'

const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      {
        path: '',
        loader: redirectToLoginLoader,
      },
      {
        path: 'login',
        loader: isLoggedLoader,
        Component: LoginPage,
      },
      {
        path: 'register',
        loader: isLoggedLoader,
        Component: RegisterPage,
      },
      {
        path: 'verify-account/:token',
        Component: VerifyAccount,
      },
    ],
  },
  {
    path: '/',
    loader: protectedLoader,
    Component: DashboardPage,
  },
  {
    path: '/*',
    Component: NotFound,
  },
])

function redirectToLoginLoader() {
  return redirect('/auth/login')
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const isLogged = localStorage.getItem('token')

  if (!isLogged) {
    const params = new URLSearchParams()
    const currentPath = new URL(request.url).pathname
    currentPath != '/' && params.set('from', new URL(request.url).pathname)

    return redirect('/auth/login?' + params.toString())
  }
  return null
}

function isLoggedLoader() {
  const isLogged = localStorage.getItem('token')

  if (isLogged) {
    return redirect('/')
  }
  return null
}

export default router
