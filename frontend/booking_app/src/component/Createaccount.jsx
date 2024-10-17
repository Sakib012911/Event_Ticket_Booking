import React,{useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorContext from '../context/error/errorcontext'
import EventContext from '../context/event/eventcontext'
import Cookies from 'js-cookie';
const Createaccount = () => {
    const [user,setuser]=useState({name:"",email:"",password:"",role:"user"})
    const context=useContext(ErrorContext)
    const conteext=useContext(EventContext)
    const {setErrorMessage,setErrorcode}=context;
    const {setusertype}=conteext;
    const navigate=useNavigate();
const handleclick = async (e) => {
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_BASE_HOST}/api/user/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({   // Stringify the body
            name:user.name,
            email: user.email,
          password: user.password,
          rolee:user.role
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
   
      const onChange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
      }
  
    return (
    <>
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <div className="row w-100">
      <div className="col-md-4 mx-auto">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Sign Up</h2>
            <form onSubmit={handleclick}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" onChange={onChange} name='name' value={user.name} className="form-control" id="text" placeholder="Enter your Name" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email"  onChange={onChange} name='email' value={user.email} className="form-control" id="email" placeholder="Enter your email" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">Password</label>
                <input type="text" onChange={onChange} name='password' value={user.password} className="form-control" id="password" placeholder="Enter your password" required/>
              </div>
              <div className="mb-3">
            <label htmlFor="role" className="form-label">Type*</label>
            <select className="form-select" value={user.role} onChange={onChange} name="role">
                <option   value="user" defaultValue>User</option>
                <option   value="organizer">Organizer</option>
            </select>
        </div>
              <button type="submit" className="btn btn-primary w-100">Sign up</button>
              <Link to="/login" className="d-block text-end mt-2 text-decoration-none">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Createaccount
