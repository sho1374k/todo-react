import React from "react";
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";

export const TodoList = (props) => {
  return(
    <div className="todo">
      <h1 className="todo-title">Todo List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <div className="todo-content">
            { todo.edit === true && todo.notYet === true?
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
              {todo.notYet === true &&
              <>
                <div className="todo-content-des" key={i}>
                  <IndividualTodo 
                    todo={todo}
                  />
                  
                </div>
                <div className="todo-content-btns">
                  <Btn  name={"実行中へ"} style={"btn btn-doing"} actionClick={props.changeDoing} value={number} i={String} />
                  <Btn  name={"編集する"} style={"btn btn-edit"} actionClick={props.changeEdit} value={number} i={String} />
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