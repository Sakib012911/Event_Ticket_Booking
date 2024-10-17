import React from 'react'
import { useNavigate } from 'react-router-dom'
// import EventContext from '../context/event/eventcontext';
const Successful = () => {
  // const context =useContext(EventContext)
  // const {setusertype}=context
    const navigate=useNavigate();
    
    setTimeout(()=>{
      navigate('/event')
      // setusertype("user")
      // window.location.reload(); 
    },3000)

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className="display-4 text-success">Booking Successful!</h1>
        <p className="lead">Your booking has been created successfully.</p>
      </div>
    </div>
    </div>
  )
}

export default Successful
