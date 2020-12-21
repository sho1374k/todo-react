import React from "react";
// npm
import { Transition } from 'react-transition-group';
// components
import {Btn} from "../button/btn";

export const Header = (props) => {
  const open_todo = {
    entering: {
      transition: 'all .5s ease', opacity: 0, transformOrigin: "center", transform: "scale(0, 0)"
    },
    // バックになった時
    entered: {
      transition: 'all .5s ease', opacity: 1, transformOrigin: "center", transform: "scale(1, 1)"
    },
    // バックからフロントにいく時
    exiting: {
      transition: 'all .5s ease', opacity: 0, transformOrigin: "center",transform: "scale(0, 0)"
    },
    // フロントになった時
    exited: {
      transition: 'all .5s ease', opacity: 1, transformOrigin: "center", transform: "scale(1, 1)"
    }
  }
  return(
    <header className="header">
      <h1 className="header-title">TODO</h1>
      <div className="header-btns">
        <div className="header-btns-reset">
          <Btn name={"Reset"} styleName={"btn btn-reset"} actionClick={props.resetTodo} value={String} i={String} />
        </div>
        <Transition in={props.openTodo} timeout={500}>
          {state => (
            <div  style={open_todo[state]}>
              { props.openTodo ?
              <Btn name={"X"} styleName={"btn btn-close-form"} actionClick={props.handleTodo} value={String} i={String} />
              :
              <Btn name={"+"} styleName={"btn btn-open-form"} actionClick={props.handleTodo} value={String} i={String} />
              }
            </div>
          )}
        </Transition>
      </div>
    </header>
  )
}
