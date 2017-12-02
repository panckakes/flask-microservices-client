import React from 'react';

const NavioTemperature = (props) => {
  return (
    <div>
      {
        props.users.map((bluetooth) => {
          return <h4 key={ naviotemperature.id } className="well">
            <strong>{ naviotemperature.temp }</strong> - 
            <em>{naviotemperature.created_at}</em></h4>
        })
      }
    </div>
  )
}

export default NavioTemperature;
