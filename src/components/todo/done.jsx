import React from "react";
import {IndividualTodo} from "./individual-todo";

export const Done = (props) => {
  return(
    <div className="">
      <h1>Done List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id 
        return(
          <>
          {todo.done === true &&
            <div className="" key={i}>
              <IndividualTodo 
                todo={todo}
              />
              <button onClick={() => props.deleteTodo(number) }>
                削除する
              </button>
              <br/>
            </div>
          }
          </>
        )
      })}
    </div>
  )
}