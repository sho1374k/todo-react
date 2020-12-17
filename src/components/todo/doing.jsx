import React from "react";
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const Doing = (props) => {
  return(
    <div className="doing">
      <h2 className="doing-title">Doing List</h2>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <>
          { todo.edit === true && todo.doing === true ?
            <div className="doing-content" key={i}>
              <EditForm 
                editTodo={props.editTodo}
                editTitle={props.editTitle}
                editContent={props.editContent}
                editError={props.editError}
                changeEdit={props.changeEdit}
                number={number}
                todo={todo}
                i={i}
              />
            </div>
          :
          <>
            {todo.doing === true &&
            <div className="doing-content" key={i}>
              <div className="doing-content-des" key={i}>
                <IndividualTodo 
                  todo={todo}
                />
              </div>
              <div className="doing-content-btns">
                <Btn  name={"Next"} styleName={"btn btn-next"} actionClick={props.changeReview} value={number} i={String} />
                <Btn  name={"Edit"} styleName={"btn btn-edit-todo"} actionClick={props.changeEdit} value={number} i={String} />
                <br/><br/>
              </div>
            </div>
            }
          </>
          }
          </>
        )
      })}
    </div>
  )
}