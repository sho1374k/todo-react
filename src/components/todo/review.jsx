import React from "react";
// npm
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCommentMedical, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faComment } from "@fortawesome/free-regular-svg-icons";
// components
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
          <div key={i} onClick={() => props.openTodo(number)}>
          {todo.review === true &&
            <div className="review-content">
              <div className="review-content-des">
                <IndividualTodo 
                  todo={todo}
                />
                <div className="comment">
                  {commentArray.length > 0 &&
                    commentArray.map((comment, i) => {
                      return(
                      <div key={i}>
                        {todo.openComment === true &&
                        <div className="comment-box">
                          <div className="comment-box-des">
                            {comment.text}
                          </div>
                          <div className="comment-box-btn">
                            <Btn  name={<FontAwesomeIcon className="font" icon={faTrashAlt } />} styleName={"btn btn-comment-delete"} actionClick={props.deleteComment} value={number} i={i} />
                          </div>
                        </div>
                        }
                      </div>
                      )
                    })
                  } 
                </div>
              </div>
              {todo.commentForm === true ?
                <CommentForm 
                  addComment ={props.addComment}
                  commentError={props.commentError}
                  changeComment={props.changeComment}
                  number={number}
                />
              :
              <div className="review-content-btns">
                <Btn  name={<FontAwesomeIcon className="font" icon={faBackward} />} styleName={"btn btn-prev"} actionClick={props.prevDoing} value={number} i={i} />
                <Btn  name={<FontAwesomeIcon className="font" icon={faCommentMedical} />} styleName={"btn btn-comment-create"} actionClick={props.changeComment} value={number} i={i} />
                {commentArray.length > 0 && todo.openComment === false ?
                  <button className="btn btn-comment-open" onClick={() => props.handleCommnet(number, i)}>
                    <FontAwesomeIcon className="font" icon={faComment} /> <span>{commentArray.length}</span>
                  </button>
                :
                  <>
                    {commentArray.length > 0 && 
                      <Btn  name={<FontAwesomeIcon className="font" icon={faTimes} />} styleName={"btn btn-comment-open"} actionClick={props.handleCommnet} value={number} i={i} />
                    }
                  </>
                }
                <Btn  name={<FontAwesomeIcon className="font" icon={faForward} />} styleName={"btn btn-next"} actionClick={props.nextDone} value={number} i={i} />
              </div>
              }
            </div>
          }
          </div>
        )
      })}
    </div>
  )
}
