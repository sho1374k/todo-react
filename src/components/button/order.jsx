import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Order = (props) => {
  return(
    <>
      {!(props.lenght ===  props.number) &&
      <button className="btn btn-up" onClick={() => props.isUp(props.number)}>
        
        <FontAwesomeIcon className="font" icon={faArrowDown} />
      </button>
      }
      {!(props.number === 1) &&
      <button className="btn btn-down" onClick={() => props.isDown(props.number)}>
        <FontAwesomeIcon className="font" icon={ faArrowUp } />
      </button>
      }
      </>
  )
}
