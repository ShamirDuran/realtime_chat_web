import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom'
import { DashboardPage, LoginPage, NotFound, RegisterPage } from '../pages'
import { authProvider } from '../providers'

const router = createBrowserRouter([
  {
    path: '/',
    loader: protectedLoader,
    Component: DashboardPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/*',
    Component: NotFound,
  },
  {
    path: '/logout',
    action: async () => {
      await authProvider.signout()
      return redirect('/login')
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

    return redirect('/login?' + params.toString())
  }
  return null
}

export default router
