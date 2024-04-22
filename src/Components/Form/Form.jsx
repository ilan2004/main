import React from 'react';
import './Form.scss'
import { useAuth } from '../../Contexts/AuthContext';
function Form() {
  const { currentUser} = useAuth()
  return (
    <div className="alldetails">
      <div className='welc-user'>
      <h1 className='welc'>WELCOME</h1>
      <h2>{currentUser && currentUser.email}</h2>
      </div>
      <h1 className='comp-loc'>Regestered Company Location:</h1>
    <form>
      <input name=" Owner;s name" type="text" className="feedback-input" placeholder=" Owner's Name" /> 
      <input name="State" type="text" className="feedback-input" placeholder="State" />  
      <input name="Location" type="text" className="feedback-input" placeholder="Location" />  
      <input name="Company Name" type="text" className="feedback-input" placeholder="Company Name" />  
      <input name="Contact Phone" type='number' className="feedback-input" placeholder="Contact Phone" />    
      <input name="Contact Mobile" type='number' className="feedback-input" placeholder="Contact Mobile" />    
      <input name="Contact email" type="text" className="feedback-input" placeholder="Contact Email" />
      <textarea name="text" className="feedback-input" placeholder="Comment"></textarea>
      <input type="submit" value="SUBMIT"/>
    </form>
    </div>
  );
}

export default Form;
