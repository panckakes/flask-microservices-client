import React from 'react';

const BluetoothList = (props) => {
  return (
    <div>
      {
        props.bluetooth.map((bluetooth) => {
          return <h4 key={ bluetooth.name } className="well">
            <strong>{ bluetooth.address }</strong> -
              <em>{bluetooth.created_at}</em></h4>
        })
      }
    </div>
  )
}

export default BluetoothList;
