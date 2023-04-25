import React from 'react'
import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import Users from './view/Users';
import Dashboard from './view/Dashboard';
import NotFound from './view/NotFound';
import GuessLayout from './components/GuessLayout';
import Login from './view/Login';
import Register from './view/Register';
import UserForm from './view/UserForm';

 const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/',
                element: <Navigate to='/users' />
            },

            {
                path: '/users/new',
                element: <UserForm key='userCreate'  />
            },

            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"  />
            }
        ]
    },

    {
        path: '/',
        element: <GuessLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },

            {
                path: '/register',
                element: <Register/>
            }
        ]
    },

    {
        path: '*',
        element: <NotFound/>
    }
])

export default routes




