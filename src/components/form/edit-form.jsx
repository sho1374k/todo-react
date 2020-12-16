import React from "react";

export const EditForm = (props) => {
  return(
    <form className="edit" onSubmit={(event) => props.editTodo(event, props.number)}>
      <div className="">
        <input className="" type="text" name="title" placeholder="enter title" 
          value={props.todo.title} onChange={(event) => props.editTitle(event, props.number)}/>
        { props.editError.errorTitle === true &&
          // エラー
          <div className="">
            タイトルを入力してください
          </div>
        }
      </div>
      
      <div className="">
        <textarea className="" name="content" id="" cols="30" rows="4" placeholder="enter text"
          onChange={(event) => props.editContent(event, props.number)}>{props.todo.content}</textarea>
        {props.editError.errorContent === true &&
          // エラー
          <div className="">
            テキストを入力してください
          </div>
        }
      </div>

      <div className="">
        <button className="" type="submit">変更する</button>
        <button className="" onClick={() => props.changeEdit(props.number)} >閉じる</button>
      </div>
    </form>
  )
}
