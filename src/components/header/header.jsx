import React from "react";

export const Header = (props) => {
  return(
    <header>
      <h1>TODO</h1>
      <div className="">
        <button className="" onClick={() => props.resetTodo()}>リセットする</button>
        <button className="" onClick={() => props.handleTodo()}>+</button>
      </div>
    </header>
  )
}
