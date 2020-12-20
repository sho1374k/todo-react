import React from "react";
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";
import {Order} from "../button/order";

export const TodoList = (props) => {
  const lenght = props.data.length;  //連想配列の長さ
  return(
    <div className="todo">
      <h2 className="todo-title">Todo List</h2>
      {props.data.sort((a, b) => a.id - b.id).map((todo, i) => {
        let number = todo.id
        
        return(
          <div key={number}>
            { todo.edit === true && todo.notYet === true?
              <div className="todo-content" key={i}>
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
                <Order
                  isUp={props.isUp}
                  isDown={props.isDown}
                  number={number}
                  lenght={lenght}
                />
              </div>
            :
            <>
              {todo.notYet === true &&
                <div className="todo-content" key={i}>
                  <div className="todo-content-des" key={i}>
                    <IndividualTodo 
                      todo={todo}
                    />
                    
                  </div>
                  <div className="todo-content-btns">
                    <Btn  name={"Next"} styleName={"btn btn-next"} actionClick={props.changeDoing} value={number} i={String} />
                    <Btn  name={"Edit"} styleName={"btn btn-edit-todo"} actionClick={props.changeEdit} value={number} i={String} />
                    <br/><br/>
                  </div>
                </div>
              }
            </>
            }
          </div>
        )
      })}
    </div>
  )
}