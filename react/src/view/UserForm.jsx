import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserForm = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const {notification,setNotification} = useStateContext();



    const [user, setUser] = useState({
      id: null,
      name: '',
      email: '',
      password: '',
    });

    if(id){
        useEffect(() => {
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setUser(data)
                })
        },[])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if(user.id){
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                toast('User was successfully updated!');
                navigate('/users')
            })

            .catch(err => {
                const response = err.respone;
                if(response && response.status == 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
        }else{
          axiosClient.post(`/users`, user)
            .then(() => {
              toast('A user was successfully added');
              navigate('/users')
            })
        }

    }

    toast.success(notification);




  return (
    <div>
      {user.id && <h1 className='h2 text-white mb-4 mt-5 text-center'>Update User: {user.name} </h1>}

      {!user.id && <h1 className='h2 text-white mb-4 mt-5 text-center'>New User</h1>}

      <div style={{ width: 400, margin: 'auto' }} >
        <form onSubmit={onSubmit}>
            <input type="text" className="form-control mb-2" value={user.name} placeholder='Enter user name' onChange={ev => setUser({...user, name: ev.target.value})} />

            <input type='email' className='form-control mb-2' value={user.email} placeholder="Enter user email"  onChange={ev => setUser({...user, email: ev.target.value })}/>

            <input type="password" placeholder='Enter your password' className='form-control mb-2' onChange={ev => setUser({...user, password: ev.target.value})}/>

            <input type='password' placeholder='Confirm your password' className='form-control mb-2' onChange={ev => setUser({...user, password_confirmation: ev.target.value})} />

            <button className="btn btn-info w-100 btn-lg">save</button>

        </form>
      </div>
    </div>
  )
}

export default UserForm
