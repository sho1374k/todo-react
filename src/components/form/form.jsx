import React from "react";

export const Form = (props) => {
  return(
    <>
    { props.openTodo === true &&
    <form className="form" onSubmit={props.addTodo} >
      <div className="">
        <input className="" type="text" name="title" placeholder="enter title"/>
        { props.error.errorTitle === true &&
          // エラー
          <div className="">
            タイトルを入力してください
          </div>
        }
      </div>
      
      <div className="">
        <textarea className="" name="content" id="" cols="30" rows="4" placeholder="enter text"></textarea>
        {props.error.errorContent === true &&
          // エラー
          <div className="">
            テキストを入力してください
          </div>
        }
      </div>

      <div className="">
        <button className="" className="" type="submit">add todo</button>
      </div>

      <button className="" onClick={() => props.handleTodo()}>閉じる</button>
    </form>
    }
    </>
  )
}