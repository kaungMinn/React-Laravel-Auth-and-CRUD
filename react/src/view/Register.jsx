import React, { useRef, useState } from 'react';
import {useStateContext} from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';


const Register = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState();


    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/register',payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch((err) => {
                const response = err.response

                console.log(response.data.errors)
                if(response && response.status == 422){
                    setErrors(response.data.errors)
                }
            })
    }

  return (
    <div style={{width: 400}} className="m-auto card p-4 mt-5 text-center" >
      <h1 className="h3 text-primary mt-5">Register</h1>


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


      <form onSubmit={onSubmit}  className='mt-3'>
        <input ref={nameRef} type="text" className="form-control" placeholder="Enter your name" />
        <input ref={emailRef} type="email" className="form-control mt-2" placeholder="Enter your email" />
        <input ref={passwordRef} type="password" className="form-control mt-2" placeholder="Enter your password" />
        <input ref={passwordConfirmationRef} type="password" className="form-control mt-2" placeholder="Confirm your password" />
        <button className="btn btn-primary mt-2 btn-lg w-100">Register</button>
        <p className='mt-2'>
            Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
