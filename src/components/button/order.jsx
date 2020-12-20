import React from "react";

export const Order = (props) => {
  return(
    <div className="order">
      {!(props.lenght ===  props.number) &&
      <button className="btn btn-up" onClick={() => props.isUp(props.number)}>UP</button>
      }
      {!(props.number === 1) &&
      <button className="btn btn-down" onClick={() => props.isDown(props.number)}>DOWN</button>
      }
    </div>
  )
}