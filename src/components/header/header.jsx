import React from "react";
import {Btn} from "../button/btn";

export const Header = (props) => {
  return(
    <header className="header">
      <h1 className="header-title">TODO</h1>
      <div className="header-btns">
        <Btn  name={"リセットする"} style={"btn btn-reset"} actionClick={props.resetTodo} value={String} i={String} />
        <Btn  name={"+"} style={"btn btn-open-form"} actionClick={props.handleTodo} value={String} i={String} />
      </div>
    </header>
  )
}
