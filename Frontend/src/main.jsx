import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import './index.css'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PdfLayout from './components/PdfLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
    <Route path='' element={<Home/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='pdf/:id' element={<PdfLayout/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/ >
      
  </StrictMode>,
)
