import React from "react";
import {EditForm} from "../form/edit-form";

export const TodoList = (props) => {
  return(
    <div className="">
      <h1>Todo List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <>
            { todo.edit === true ?
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
                  <div className="">
                    {todo.id}
                  </div>
                  <div className="">
                    {todo.title}
                  </div>
                  <div className="">
                    {todo.content}
                  </div>
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