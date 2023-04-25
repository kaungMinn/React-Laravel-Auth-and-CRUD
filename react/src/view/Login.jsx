import React, { useRef, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState();


    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch((err) => {
                const response = err.response;

                if(response && response.status == 422){
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }



  return (
    <div style={{width: 400}} className="m-auto card p-4 mt-5" >
        <h1 className="h3 text-center text-primary ">
            Login
        </h1>

        {errors &&

            <div className="mt-3 px-2 py-1  bg-warning">
                {
                    Object.keys(errors).map(key => (
                        <li className="list-group-item list-group-item-warning text-center mb-1">
                            {errors[key][0]}
                        </li>
                    ))
                }
            </div>
        }

        <form onSubmit={onSubmit} className="mt-3 text-center ">
            <input ref={emailRef}  type="email" className="form-control mb-2" placeholder='Enter Your Email' />
            <input ref={passwordRef} type="password" className="form-control mb-2" placeholder="Enter Your Password" />
            <button className="btn btn-lg btn-primary w-100 mb-2">Login</button>
            <p>
            Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    </div>
  )
}

export default Login
