import React from 'react';
export default function Error(props) {
return(
  <div className="notifError">
     <p>{props.error}</p>
  </div>
  )
}