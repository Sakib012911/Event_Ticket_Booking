import React from 'react'
import ErrorContext from './errorcontext'
import { useState } from 'react'

const Errorstate = (props) => {
 const [errorMessage,setErrorMessage]=useState("")
 const [errorcode,setErrorcode]=useState("")
 
 
 
    return (

       <ErrorContext.Provider value={{setErrorMessage,errorMessage,setErrorcode,errorcode}}>
            {props.children}
        </ErrorContext.Provider>
 
  )
}

export default Errorstate
