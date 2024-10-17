import React,{useContext, useEffect} from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import EventContext from '../context/event/eventcontext';




const Navbar = () => {
const navigate =useNavigate()
const context=useContext(EventContext)
const {usertype,setusertype}=context;
  let location = useLocation();
  useEffect(( )=>{
  },[location]);

  const handleclick=(e)=>{
    e.preventDefault()
    Cookies.remove("token")
    setusertype(" ")
    navigate("/");
  }

  return (
   <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Booking My Event</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className= {`nav-link ${location.pathname==="/event"?"active":""}`} to="/event">Events</Link>
          </li>
         {usertype==="user" && (
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/booking"?"active":""}`} to="/booking">Bookings</Link>
          </li>)}

          {usertype==="organizer" && (<> <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/myevent"?"active":""}`} to="/myevent">Myevents</Link>
          </li>
          <li className="nav-item">
          <Link to="/createevent"> <button className="btn btn btn-info" type="button">Create</button> </Link>
          </li></>)}

          {!Cookies.get("token")?
          <li className="nav-item">
          <Link to="/login"> <button className="btn btn btn-info mx-1" type="button">Login</button> </Link>
          </li>: <li className="nav-item">
          <Link> <button className="btn btn btn-info mx-1" type="button" onClick={handleclick}>Log out</button> </Link>
          </li>
          }
        </ul>
      </div>
    </div>
  </nav> 
   </>
  )
}

export default Navbar
