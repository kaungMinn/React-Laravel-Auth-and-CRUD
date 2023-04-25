import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {

    const {token, user, setUser, setToken} = useStateContext();
    console.log(user)
    if(!token){
        return <Navigate to='/login'  />
    }

    const onClick = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)

            })
    },[])

  return (
    <div className="container-fluid">
        <div className="row g-0" >
            <nav className="col-2 bg-light pe-3">
                <h1 className="h4 py-3 text-center text-primary">
                    <i className="fas fa-ghost me-2"></i>
                    <span className="d-none d-lg-inline">
                        {user.name}
                    </span>
                </h1>

                <div className="list-group text-center text-lg-start">
                    <span className="list-group-item disabled d-none d-lg-block">
                        <small>CONTROLS</small>
                    </span>

                    <Link to="/dashboard" className="list-group-item list-group-item-action ">
                        <i className="fas fa-home me-2"></i>
                        <span className="d-none d-lg-inline">Dashboard</span>
                    </Link>

                    <Link to="/users" className="list-group-item list-group-item-action">
                        <i className="fas fa-users me-2"></i>
                        <span className="d-none d-lg-inline">Users</span>
                    </Link>
                </div>
            </nav>

            <main className="col-10 bg-secondary" style={{ minHeight: 600 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="flex-fill"></div>

                    <div className="navbar nav">
                        <li className="nav-item">
                            <Link className="btn btn-warning btn-sm" onClick={onClick}>Logout</Link>
                        </li>
                    </div>
                </nav>

                <Outlet/>
            </main>

        </div>

    </div>
  )
}

export default DefaultLayout
