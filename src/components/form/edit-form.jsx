import React from "react";
import {Btn} from "../button/btn";

export const EditForm = (props) => {
  return(
    <form className="edit" onSubmit={(event) => props.editTodo(event, props.number)}>
      <div className="edit-id">
        <div className="edit-id-box">
          {props.todo.id}
        </div>
      </div>

      <div className="edit-title">
        <input className="edit-title_input" type="text" name="title" placeholder="enter title" 
          value={props.todo.title} onChange={(event) => props.editTitle(event, props.number)}/>
        { props.editError.errorTitle === true &&
          // エラー
          <div className="edit-title_error">
            タイトルを入力してください
          </div>
        }
      </div>
      
      <div className="edit-content">
        <textarea className="edit-content_input" name="content" id="" cols="30" rows="4" placeholder="enter text"
          onChange={(event) => props.editContent(event, props.number)} value={props.todo.content}/>
        {props.editError.errorContent === true &&
          // エラー
          <div className="edit-content_error">
            テキストを入力してください
          </div>
        }
      </div>

      <div className="edit-btns">
        <button className="btn btn-edit-todo" type="submit">Edit</button>
        <button className="btn btn-close-edit" type="submit">Close</button>
      </div>
    </form>
  )
}
