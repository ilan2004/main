import React from 'react'
import './Warranty.css'
import War from '../../assets/img/war1.png'
const Warranty = () => {
  return (
    <div className='Warranty'>
      <div className="warranty-box">
<div className="text">
    <h1 className='exse'>
    Battery Warranty Extension Service
    </h1>
    <p className='loo'>
    An EV battery warranty extension is a service contract that extends the coverage of your electric vehicle's battery after the factory warranty expires. These extensions are also known as vehicle service contracts, and they typically cover repairs for specific parts of the vehicle.
 For our Clients, HertzEv will provide free Health check periodically & provide health Report for the Battery & the recommendation to get a longer life as per his charging & discharging pattern.
    </p>
</div>
<div className="extent">
    <img className='year' src={War} alt="Warranty"/>
</div>
</div>
    </div>
  )
}
export default Warranty;
