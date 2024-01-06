import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom'
import { DashboardPage, LoginPage, NotFound, RegisterPage, VerifyAccount } from '../pages'
import { authProvider } from '../providers'

const router = createBrowserRouter([
  {
    path: '/',
    loader: protectedLoader,
    Component: DashboardPage,
  },
  {
    path: '/*',
    Component: NotFound,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'verify-account/:token',
        Component: VerifyAccount,
      },
    ],
  },
  {
    path: '/logout',
    action: async () => {
      await authProvider.signout()
      return redirect('/auth/login')
    },
  },
])

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams()
    const currentPath = new URL(request.url).pathname
    currentPath != '/' && params.set('from', new URL(request.url).pathname)

    return redirect('/auth/login?' + params.toString())
  }
  return null
}

export default router
