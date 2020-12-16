import React from "react";

export const IndividualTodo = (props) => {
  return(
    <>
      <div className="">
        {props.todo.id}
      </div>
      <div className="">
        {props.todo.title}
      </div>
      <div className="">
        {props.todo.content}
      </div>
    </>
  )
}