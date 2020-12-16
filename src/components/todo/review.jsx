import React from "react";

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
              <div className="">
                {todo.id}
              </div>
              <div className="">
                {todo.title}
              </div>
              <div className="">
                {todo.content}
              </div>
              
              <br/>
              {/* コメント内容 */}
              {commentArray.length > 0 &&
                commentArray.map((comment, i) => {
                  return(
                    <div className="" key={i}>
                      {comment.text}
                      <br/>
                      <button onClick={() => props.deleteComment(number, i)}>コメント削除</button>
                    </div>

                  )
                })
              }
              
              <button onClick={() => props.changeDone(number)}>
                完了する
              </button>
              <br/>
              {todo.commentForm === true ?
              <>
              <form onSubmit={(event) => props.addComment(event, number)}>
                <input type="text" name="comment"/>
                {props.commentError === true &&
                  <div className="">
                    コメントを入力してください
                  </div>
                }
                <button type="submit" >コメントを追加する</button>
                <button onClick={() => props.changeComment(number)}>閉じる</button>
              </form>
              
              </>
              :
              <button onClick={() => props.changeComment(number)}> 
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