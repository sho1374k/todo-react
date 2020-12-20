import React from "react";
import {IndividualTodo} from "./individual-todo";
import {CommentForm} from "../form/comment-form";
import {Btn} from "../button/btn";

export const Review = (props) => {
  return(
    <div className="review">
      <h2 className="review-title">Review List</h2>
      {props.data.sort((a, b) => a.id - b.id).map((todo, i) => {
        let number = todo.id;
        let commentArray = todo.comment;
        return(
          <div key={i}>
          {todo.review === true &&
            <div className="review-content" key={i}>
              <div className="review-content-des">
                <IndividualTodo 
                  todo={todo}
                />
                  <div className="comment">
                    {commentArray.length > 0 &&
                      commentArray.map((comment, i) => {
                        return(
                          <div className="comment-box" key={i}>
                            {todo.openComment === true &&
                            <>
                              <div className="comment-box-des">
                                {comment.text}
                              </div>
                              <div className="comment-box-btn">
                                <Btn  name={"Delete"} styleName={"btn btn-comment-delete"} actionClick={props.deleteComment} value={number} i={i} />
                              </div>
                            </>
                          }
                          </div>
                        )
                      })
                    }
                    {commentArray.length > 0 && todo.openComment === false ?
                      <div className="comment-open">
                       <Btn  name={"▼"} styleName={"btn btn-comment-open"} actionClick={props.handleCommnet} value={number} i={i} />
                     </div>
                     :
                     <div className="comment-open">
                       {console.log(todo.openComment)}
                       <Btn  name={"X"} styleName={"btn btn-comment-open"} actionClick={props.handleCommnet} value={number} i={i} />
                     </div>
                    }
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
                        <Btn  name={"Next"} styleName={"btn btn-next"} actionClick={props.changeDone} value={number} i={i} />
                        <Btn  name={"Comment"} styleName={"btn btn-comment-create"} actionClick={props.changeComment} value={number} i={i} />
                      </div>
          
                    }
                    <br/><br/>
                  </div>
              </div>
            </div>
          }
          </div>
        )
      })}
    </div>
  )
}
