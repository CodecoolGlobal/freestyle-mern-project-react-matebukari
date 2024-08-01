import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import GamePage from './Pages/GamePage.jsx'
import MyQuestions from "./Pages/MyQuestions/MyQuestions.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <LoginPage/>,
      },
      {
        path: '/register',
        element: <RegisterPage/>
      },
      {
        path: '/game',
        element: <GamePage/>
      },
      {
        path: '/questions-by-user/:id',
        element: <MyQuestions/>
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
