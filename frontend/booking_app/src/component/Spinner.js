import React from 'react'
// import PropTypes from 'prop-types'
// import loading from '../loading.gif'

const Spinner=()=> {

    return (
<>
<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "10vh" }}>
  <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#f50000" }}></i>
</div>


</>

    )
  
}

export  default Spinner;