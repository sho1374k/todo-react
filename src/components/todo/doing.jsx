import React from "react";
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const Doing = (props) => {
  return(
    <div className="doing">
      <h1 className="doing-title">Doing List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <div className="doing-content">
          { todo.edit === true && todo.doing === true ?
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
          :
          <>
            {todo.doing === true &&
            <>
              <div className="doing-content-des" key={i}>
                <IndividualTodo 
                  todo={todo}
                />
              </div>
              <div className="doing-content-btns">
                <Btn  name={"確認待ちへ"} style={"btn btn-review"} actionClick={props.changeReview} value={number} i={String} />
                <Btn  name={"編集する"} style={"btn btn-edit-todo"} actionClick={props.changeEdit} value={number} i={String} />
                <br/><br/>
              </div>
            </>
            }
          </>
          }
        </div>
        )
      })}
    </div>
  )
}