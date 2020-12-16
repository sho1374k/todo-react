import React from "react";
import {Btn} from "../button/btn";

export const Form = (props) => {
  return(
    <>
    { props.openTodo === true &&
    <form className="form" onSubmit={props.addTodo} >
      <div className="form-title">
        <input className="form-title_input" type="text" name="title" placeholder="enter title"/>
        { props.error.errorTitle === true &&
          // エラー
          <div className="form-title_error">
            タイトルを入力してください
          </div>
        }
      </div>
      
      <div className="form-content">
        <textarea className="form-content_input" name="content" id="" cols="30" rows="4" placeholder="enter text"></textarea>
        {props.error.errorContent === true &&
          // エラー
          <div className="form-content__error">
            テキストを入力してください
          </div>
        }
      </div>

      <div className="form-btns">
        <button className="btn btn-add-todo" className="" type="submit">add todo</button>
        <Btn  name={"閉じる"} style={"btn btn-close-form"} actionClick={props.handleTodo} value={String} i={String} />
      </div>
    </form>
    }
    </>
  )
}