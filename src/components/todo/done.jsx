import React from "react";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const Done = (props) => {
  return(
    <div className="done">
      <h1 className="done-title">Done List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id 
        return(
          <div className="done-content">
          {todo.done === true &&
          <>
            <div className="done-content-des" key={i}>
              <IndividualTodo 
                todo={todo}
              />
            </div>
            <div className="done-content-btns">
              <Btn  name={"削除する"} style={"btn btn-todo-delete"} actionClick={props.deleteTodo} value={number} i={String} />
              <br/>
            </div>
          </>
          }
          </div>
        )
      })}
    </div>
  )
}