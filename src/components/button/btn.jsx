import React from "react";

export const Btn = (props) => {
  return(
    <button className={props.style} onClick={() => props.actionClick(props.value, props.i) }>
      {props.name}
    </button>
  )
}
