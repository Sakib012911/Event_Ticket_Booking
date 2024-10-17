import React from 'react'
import ErrorContext from '../context/error/errorcontext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
    const context=useContext(ErrorContext)
    const {errorMessage,errorcode}=context
  return (
    <div>
       <div className="container error-container">
    <div className="text-center">
      <h1 className="display-4 text-danger">Error {errorcode}</h1>
      <p className="lead">Oops! {errorMessage}.</p>
      <Link to="/event" className="btn btn-primary">Go To Event</Link>
    </div>
  </div>
    </div>
  )
}

export default Error;
