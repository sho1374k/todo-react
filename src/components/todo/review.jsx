import React from "react";
import {IndividualTodo} from "./individual-todo";
import {CommentForm} from "../form/comment-form";
import {Btn} from "../button/btn";

export const Review = (props) => {
  return(
    <div className="review">
      <h1 className="review-title">Review List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id;
        let commentArray = todo.comment;
        return(
          <div className="review-content">
          {todo.review === true &&
            <div className="review-content-des" key={i}>
              <IndividualTodo 
                todo={todo}
              />
              
              <div className="commnet">
                {commentArray.length > 0 &&
                  commentArray.map((comment, i) => {
                    return(
                      <div className="comment-box" key={i}>
                        <div className="comment-box-des">
                          {comment.text}
                        </div>
                        <div className="comment-box-btn">
                          <Btn  name={"コメント削除"} style={"btn btn-comment-delete"} actionClick={props.deleteComment} value={number} i={i} />
                        </div>
                      </div>
                    )
                  })
                }
                {console.log(todo.commentForm)}

                {todo.commentForm === true ?
                  <>
                    <CommentForm 
                      addComment ={props.addComment}
                      commentError={props.commentError}
                      changeComment={props.changeComment}
                      number={number}
                    />
                  </>
                :
                  <div className="comment-btns">
                    <Btn  name={"完了する"} style={"btn btn-complate"} actionClick={props.changeDone} value={number} i={i} />
                    <Btn  name={"コメントする"} style={"btn btn-comment-create"} actionClick={props.changeComment} value={number} i={i} />
                  </div>
                  
                }
                <br/><br/>
              </div>
            </div>
          }
          </div>
        )
      })}
    </div>
  )
}
