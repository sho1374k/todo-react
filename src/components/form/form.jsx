import React from "react";
import {Btn} from "../button/btn";

export const Form = (props) => {
  const height = window.innerHeight;

  return(
    <>
      { props.openTodo === true &&
      <div className="modal" style={{height: height}}>
        <form className="form" onSubmit={props.addTodo} style={{height: height*0.57}} >
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
              <div className="form-content_error">
                テキストを入力してください
              </div>
            }
          </div>
          <div className="form-btns">
            <button className="btn btn-add-todo" type="submit">add todo</button>
            <Btn  name={"Close"} styleName={"btn btn-close-form"} actionClick={props.handleTodo} value={String} i={String} />
          </div>
        </form>
      </div>
      }
    </>
  )
}