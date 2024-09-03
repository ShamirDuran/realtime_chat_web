import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom'
import {
  DashboardPage,
  ForgotPassword,
  LoginPage,
  NotFound,
  PasswordReset,
  RegisterPage,
  VerifyAccount,
} from '../pages'
import { DashboardLayout } from '../layout'

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
        path: 'password_reset',
        loader: isLoggedLoader,
        Component: ForgotPassword,
      },
      {
        path: 'password_reset/:token',
        loader: isLoggedLoader,
        Component: PasswordReset,
      },
      {
        path: 'verify_account/:token',
        Component: VerifyAccount,
      },
    ],
  },
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        path: '',
        loader: protectedLoader,
        Component: DashboardPage,
      },
    ],
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
  const token = localStorage.getItem('token')

  if (!token) {
    const params = new URLSearchParams()
    const currentPath = new URL(request.url).pathname
    currentPath != '/' && params.set('from', new URL(request.url).pathname)

    return redirect('/auth/login?' + params.toString())
  }

  return null
}

function isLoggedLoader() {
  const token = localStorage.getItem('token')

  if (token) {
    return redirect('/')
  }
  return null
}

export default router
