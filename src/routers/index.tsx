import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router'
import { router } from './MainRoutes'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()
export default function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
