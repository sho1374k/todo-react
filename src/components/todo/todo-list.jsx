import React from "react";
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";

export const TodoList = (props) => {
  return(
    <div className="">
      <h1>Todo List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <>
            { todo.edit === true && todo.notYet === true?
            <>
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
            </>
            :
            <>
              {todo.notYet === true &&
                <div className="" key={i}>
                  <IndividualTodo 
                    todo={todo}
                  />
                  <button onClick={() => props.changeDoing(number)}>
                    実行中へ
                  </button>
                  <button onClick={() => props.changeEdit(number)}>
                    編集する
                  </button>
                  <br/>
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