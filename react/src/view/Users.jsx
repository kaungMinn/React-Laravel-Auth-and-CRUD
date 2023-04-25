import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {

    const [users, setUsers] = useState();


    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = () => {

        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data)
            })
    }

    const onDelete = (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                toast('A user deleted!')
                getUsers()
            })
    }

    return (
        <div className='container mb-5 text-center '>

            <div className="d-flex align-items-center justify-content-between mt-3">
                <h1 className=' h2 text-white ms-2'>User Table</h1>
                <Link className="btn btn-sm btn-primary me-2" to='/users/new'>+ Add</Link>
            </div>

            <div>

                <div style={{ width: '74vw', margin: 'auto' }} className='mt-3'>
                    <table className="table table table-light" >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                         <tbody>
                            {users &&

                                users.map(user => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>

                                        <td>

                                            <Link to={'/users/' + user.id}
                                                className="btn btn-primary btn-sm">Edit</Link>
                                            &nbsp;
                                            <button className="btn btn-warning btn-sm" onClick={ev => onDelete(user)} >Delete</button>
                                        </td>

                                    </tr>
                                ))

                            }
                        </tbody>

                    </table>
                </div>
            </div>



            <ToastContainer />
        </div>
    )
}

export default Users
