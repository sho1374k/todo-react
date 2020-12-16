import React from "react";

export const CommentForm = (props) => {
  return(
    <form className="" onSubmit={(event) => props.addComment(event, props.number)}>
      <input className="" type="text" name="comment"/>
      {props.commentError === true &&
        <div className="">
          コメントを入力してください
        </div>
      }
      <button className="" type="submit" >コメントを追加する</button>
      <button className="" onClick={() => props.changeComment(props.number)}>閉じる</button>
    </form>
  )
}
