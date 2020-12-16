import React from "react";

export const Header = (props) => {
  return(
    <header>
      <h1>TODO</h1>
      <div className="">
        <button onClick={() => props.resetTodo()}>リセットする</button>
        <button onClick={() => props.handleTodo()}>+</button>
      </div>
    </header>
  )
}
