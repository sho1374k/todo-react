import React from "react";
import {Btn} from "../button/btn";

export const CommentForm = (props) => {
  return(
    <form className="commentForm" onSubmit={(event) => props.addComment(event, props.number)}>
      <div className="commentForm-text">
        <input className="commentForm-text_input" type="text" name="comment"/>
        {props.commentError === true &&
          <div className="commentForm-text_error">
            コメントを入力してください
          </div>
        }
      </div>

      <div className="commentForm-btns">
        <button className="brn btn-add-comment" type="submit" >コメントを追加する</button>
        <Btn name={"閉じる"} styleName={"btn btn-close-comenntForm"} actionClick={props.changeComment} value={props.number} i={String} />
      </div>
    </form>
  )
}
