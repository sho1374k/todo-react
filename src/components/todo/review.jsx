import React from "react";
import {IndividualTodo} from "./individual-todo";
import {CommentForm} from "../form/comment-form";

export const Review = (props) => {
  return(
    <div className="">
      <h1>Review List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id;
        let commentArray = todo.comment;
        return(
          <>
          {todo.review === true &&
            <div className="" key={i}>
              <IndividualTodo 
                todo={todo}
              />
              <br/>
              {/* コメント内容 */}
              {commentArray.length > 0 &&
                commentArray.map((comment, i) => {
                  return(
                    <div className="" key={i}>
                      {comment.text}
                      <br/>
                      <button className="" onClick={() => props.deleteComment(number, i)}>コメント削除</button>
                    </div>
                  )
                })
              }
              
              <button className="" onClick={() => props.changeDone(number)}>
                完了する
              </button>
              <br/>
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
              <button className="" onClick={() => props.changeComment(number)}> 
                コメントする
              </button>
              }
              <br/><br/>
            </div>
            
          }
          </>
        )
      })}
    </div>
  )
}
