import React from "react";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const Done = (props) => {
  return(
    <div className="done">
      <h2 className="done-title">Done List</h2>
      {props.data.map((todo, i) => {
        let number = todo.id 
        return(
          <div key={i}>
          {todo.done === true &&
            <div className="done-content" key={i}>
              <div className="done-content-des" key={i}>
                <IndividualTodo 
                  todo={todo}
                />
              </div>
              <div className="done-content-btns">
                <Btn  name={"Delete"} styleName={"btn btn-todo-delete"} actionClick={props.deleteTodo} value={number} i={String} />
                <br/>
              </div>
            </div>
          }
          </div>
        )
      })}
    </div>
  )
}