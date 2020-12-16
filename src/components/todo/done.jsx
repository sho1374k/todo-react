import React from "react";

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
              <div className="">
                {todo.id}
              </div>
              <div className="">
                {todo.title}
              </div>
              <div className="">
                {todo.content}
              </div>
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