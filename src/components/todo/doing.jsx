import React from "react";

export const Doing = (props) => {
  return(
    <div className="">
      <h1>Doing List</h1>
      {props.data.map((todo, i) => {
        let number = todo.id
        return(
          <>
          { todo.edit === true ?
            <form className="edit" onSubmit={(event) => props.editTodo(event, number)}>
              <div className="">
                <input className="" type="text" name="title" placeholder="enter title" 
                  value={todo.title} onChange={(event) => props.editTitle(event, number)}/>
                { props.editError.errorTitle === true &&
                  // エラー
                  <div className="">
                    タイトルを入力してください
                  </div>
                }
              </div>
              
              <div className="">
                <textarea className="" name="content" id="" cols="30" rows="4" placeholder="enter text"
                  onChange={(event) => props.editContent(event, number)}>{todo.content}</textarea>
                {props.editError.errorContent === true &&
                  // エラー
                  <div className="">
                    テキストを入力してください
                  </div>
                }
              </div>
  
              <div className="">
                <button className="" type="submit">変更する</button>
              </div>
            </form>
          :
            <>
            {todo.doing === true &&
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
                <button onClick={() => props.changeReview(number)}>
                  確認待ちへ
                </button>
                <button onClick={() => props.changeEdit(number)}>
                  編集する
                </button>
                <br/>
              </div>
            }
            </>
          }
          </>
        )
      })}
    </div>
  )
}