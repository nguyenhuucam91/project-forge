import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './routers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes></AppRoutes>
    <Toaster />
    <ToastContainer />
  </>
)
