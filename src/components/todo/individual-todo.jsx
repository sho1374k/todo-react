import React from "react";

export const IndividualTodo = (props) => {
  return(
    <div className="todo-des">
      <div className="todo-des_id">
        {props.todo.id}
      </div>
      <div className="todo-des_title">
        {props.todo.title}
      </div>
      { props.todo.open === true &&
      <div className="todo-des_content">
        {props.todo.content}
      </div>
      }
    </div>
  )
}
