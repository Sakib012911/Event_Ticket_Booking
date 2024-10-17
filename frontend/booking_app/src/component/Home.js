import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
   {/* Hero Section  */}
  <div className='hero-section'>
      <h1>Find and Book Exciting Events</h1>
      <p>Explore and reserve tickets for your favorite events easily.</p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>

      <Link to="/event" className="btn btn-primary btn-lg" style={{display:"inline-block",padding: '10px 20px', textDecoration: 'none' }}>Browse Events <i className="fa-solid fa-arrow-right" style={{color: "#ffffff"}}></i></Link>
    </div>
    </div>

    {/* footer */}
    <div className="text-center" style={{height:"37px",backgroundColor:"rgb(13 110 253 / 68%)"}}>
      <ul className="list-item mb-3">
        <li className="list-inline-item mt-1"><a href='/'><i className="fa-brands fa-instagram fa-lg" style={{color: "#ee00ff"}}></i></a></li>
        <li className="list-inline-item mt-1"><a href='/'><i className="fa-brands fa-facebook fa-lg" style={{color: "#0033ff"}}></i></a></li>
        <li className="list-inline-item mt-1"><a href='/'><i className="fa-solid fa-phone" style={{color: "#ffffff"}}></i></a></li>
      </ul>
    </div>
        <h6 className='fw-normal text-center ' style={{fontSize:"14px"}}>© 2024 Event Booking System. All Rights Reserved.</h6>


    </>
  )
}

export default Home
