import React from "react";
// npm
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
// components
import {EditForm} from "../form/edit-form";
import {IndividualTodo} from "./individual-todo";
import {Btn} from "../button/btn";
import {Order} from "../button/order";

export const Doing = (props) => {
  const lenght = props.data.length;  //連想配列の長さ
  return(
    <div className="doing">
      <h2 className="doing-title">Doing List</h2>
      {props.data.sort((a, b) => a.id - b.id).map((todo, i) => {
        let number = todo.id
        return(
          <div key={i}>
          { todo.edit === true && todo.doing === true ?
            <div className="doing-content" key={i}>
              <EditForm 
                editTodo={props.editTodo}        editTitle={props.editTitle}
                editContent={props.editContent}  editError={props.editError}
                changeEdit={props.changeEdit}    number={number}
                todo={todo} i={i}
              />
            </div>
          :
          <>
            {todo.doing === true &&
            <div className="doing-content" key={i}>
              <div className="doing-content-des" key={i}  onClick={() => props.openTodo(number)}>
                <IndividualTodo 
                  todo={todo}
                />
              </div>
              <div className="doing-content-btns">
              <Btn  name={<FontAwesomeIcon className="font" icon={faBackward} />} styleName={"btn btn-prev"} actionClick={props.prevTodo} value={number} i={i} />
                <Btn  name={<FontAwesomeIcon className="font" icon={faEllipsisH} />} styleName={"btn btn-edit-todo"} styleName={"btn btn-edit-todo"} actionClick={props.changeEdit} value={number} i={String} />
                <Order
                  isUp={props.isUp}
                  isDown={props.isDown}
                  number={number}
                  lenght={lenght}
                />
                <Btn  name={<FontAwesomeIcon className="font" icon={faForward} />} styleName={"btn btn-next"} actionClick={props.nextReview} value={number} i={String} />
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
