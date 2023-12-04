/* eslint-disable no-unused-vars */

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import AddLinks from './pages/AddLinks.jsx'
import AddProfileDetails from './pages/AddProfileDetails.jsx'
import Preview from './pages/Preview.jsx'
import {AuthLayout} from './components'

const router = createBrowserRouter(createRoutesFromElements(
   <Route>
    <Route path="/" element={<AuthLayout authentication={false} ><Login /></AuthLayout>}/>
    <Route path='/signup' element={<AuthLayout authentication={false} ><SignUp /></AuthLayout>}/>
    <Route path='/add-profile-details' element={<AuthLayout authentication={true} ><AddProfileDetails /></AuthLayout>}/>
    <Route path='/add-links' element={<AuthLayout authentication={true} ><AddLinks/></AuthLayout>}/>
    <Route path='/preview' element={<AuthLayout authentication={true} ><Preview/></AuthLayout>}/>
   </Route> 
))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
