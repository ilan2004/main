import React from 'react';
import './Form.scss'
function Form() {
  return (
    <div className="alldetails">
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
