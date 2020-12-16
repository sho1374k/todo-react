import React from "react";

export const Btn = (props) => {
  return(
    <button className={props.styleName} onClick={() => props.actionClick(props.value, props.i) }>
      {props.name}
    </button>
  )
}
