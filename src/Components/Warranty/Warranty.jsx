import React from 'react'
import './Warranty.css'
import War from '../../assets/img/Warranty.jpeg'
const Warranty = () => {
  return (
    <div className='Warranty'>
<div className="text">
    <h1>
        10 Year Warranty 
    </h1>
    <p>
        
    </p>
</div>
<div className="extent">
    <img className='year' src={War} alt="Warranty"/>
</div>

    </div>
  )
}
export default Warranty;
