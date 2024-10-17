import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ErrorContext from '../context/error/errorcontext';
import Cookies from 'js-cookie';
import EventContext from '../context/event/eventcontext';
const Login = () => {
  const [login, setlogin] = useState({ email: "", password: "" })
const navigate=useNavigate();
 const context=useContext(ErrorContext)
 const {setErrorcode,setErrorMessage}=context
 const conteext=useContext(EventContext)
 const {setusertype}=conteext;

const handleclick = async (e) => {
  // console.log(process.env.REACT_APP_BASE_HOST)
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_HOST}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({   // Stringify the body
        email: login.email,
        password: login.password
      })
    })

    const  data =await response.json();
    console.log(data)
    if(data.sucess){
      Cookies.set("token",data.token)
      setusertype(data.role)
      navigate("/event")
    }
    else{
      setErrorMessage(data.message)
      setErrorcode(response.status)
      navigate("/error")
    }

  }
  const onChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-4 mx-auto">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleclick} >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' onChange={onChange} value={login.name} className="form-control" id="email" placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onChange} value={login.password} className="form-control" id="password" placeholder="Enter your password" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                  <Link to="/createaccount" className="d-block text-end mt-2 text-decoration-none">Create</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}


export default Login;
