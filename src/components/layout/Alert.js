import React from 'react';
// this is a default alert to notify users for errors etc.
export const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'>{alert.msg}</i>
      </div>
    )
  );
};

export default Alert;
