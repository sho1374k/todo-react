import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const Done = (props) => {
  return(
    <div className="done">
      <h2 className="done-title">Done List</h2>
      {props.data.sort((a, b) => a.id - b.id).map((todo, i) => {
        let number = todo.id 
        return(
          <div key={i} onClick={() => props.openTodo(number)}>
          {todo.done === true &&
            <div className="done-content" key={i}>
              <div className="done-content-des" key={i}>
                <IndividualTodo 
                  todo={todo}
                />
              </div>
              <div className="done-content-btns">
                <Btn  name={<FontAwesomeIcon className="font" icon={faTrashAlt } />} styleName={"btn btn-todo-delete"} actionClick={props.deleteTodo} value={number} i={String} />
              </div>
            </div>
          }
          </div>
        )
      })}
    </div>
  )
}