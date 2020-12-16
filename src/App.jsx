import React from "react";
// CSS
import './assets/sass/reset.scss';
import './assets/sass/style.scss';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[
        {id:1, title: "タイトル1", content: "コンテンツ1", notYet: true, doing: false, review: false,  done: false, edit: false },
        {id:2, title: "タイトル2", content: "コンテンツ2", notYet: true, doing: false, review: false,  done: false, edit: false },
        {id:3, title: "タイトル3", content: "コンテンツ3", notYet: true, doing: false, review: false,  done: false, edit: false },
        {id:4, title: "タイトル4", content: "コンテンツ4", notYet: true, doing: false, review: false,  done: false, edit: false },
        {id:5, title: "タイトル5", content: "コンテンツ5", notYet: true, doing: true, review: false,  done: false, edit: false },
        {id:6, title: "タイトル6", content: "コンテンツ6", notYet: true, doing: false, review: true,  done: false, edit: false },
        {id:7, title: "タイトル7", content: "コンテンツ7", notYet: true, doing: false, review: false,  done: true, edit: false },
      ],
      error:{
        errorTitle: false,
        errorContent: false
      },
      editError:{
        errorTitle: false,
        errorContent: false
      }
    };

  render(){
    const error = this.state.error;
    const editError = this.state.editError;
    return(
      <>
        <header>todo</header>

        <main>
          {/* リセットボタン */}
          <div className="">
            <button onClick={() => this.resetTodo()}>リセットする</button>
          </div>

          {/* フォーム */}
          <form className="form" onSubmit={this.addTodo} >
            <div className="">
              <input className="" type="text" name="title" placeholder="enter title"/>
              { error.errorTitle === true &&
                // エラー
                <div className="">
                  タイトルを入力してください
                </div>
              }
            </div>
            
            <div className="">
              <textarea className="" name="content" id="" cols="30" rows="4" placeholder="enter text"></textarea>
              {error.errorContent === true &&
                // エラー
                <div className="">
                  テキストを入力してください
                </div>
              }
            </div>

            <div className="">
              <button className="" type="submit">add todo</button>
            </div>
          </form>


          {/* リスト表示 */}
          <h1>Todo List</h1>
          <div className="">
            {this.state.data.map((todo, i) => {
              let number = todo.id
              return(
                <>
                  { todo.edit === true ?
                    <form className="edit" onSubmit={(event) => this.editTodo(event, number)}>
                      <div className="">
                        <input className="" type="text" name="title" placeholder="enter title" 
                          value={todo.title} onChange={(event) => this.editTitle(event, number)}/>
                        { editError.errorTitle === true &&
                          // エラー
                          <div className="">
                            タイトルを入力してください
                          </div>
                        }
                      </div>
                      
                      <div className="">
                        <textarea className="" name="content" id="" cols="30" rows="4" placeholder="enter text"
                          onChange={(event) => this.editContent(event, number)}>{todo.content}</textarea>
                        {editError.errorContent === true &&
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
                    {todo.notYet === true &&
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
                        <button onClick={() => this.changeDoing(number)}>
                          実行中へ
                        </button>
                        <button onClick={() => this.changeEdit(number)}>
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
          
          <br/><br/><br/><br/>

          {/* リスト表示 */}
          <h1>Doing List</h1>
          <div className="">
            {this.state.data.map((todo, i) => {
              let number = todo.id
              return(
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
                  <button onClick={() => this.changeReview(number)}>
                    確認待ちへ
                  </button>
                  <button>
                    編集する
                  </button>
                  <br/>
                </div>
                }
                </>
              )
            })}
          </div>
          
          <br/><br/><br/><br/>

          {/* 確認まちタスク */}
          <h1>Review List</h1>
          <div className="">
            {this.state.data.map((todo, i) => {
              let number = todo.id;
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
                    <button onClick={() => this.changeDone(number)}>
                      完了する
                    </button>
                    <button>
                      編集する
                    </button>
                    <br/>
                  </div>
                }
                </>
              )
            })}
          </div>

          <br/><br/><br/><br/>
          
          {/* 完了タスク */}
          <h1>Done List</h1>
          <div className="">
            {this.state.data.map((todo, i) => {
              let number = todo.id 
              return(
                <>
                {todo.done === true &&
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
                    <button onClick={() => this.deleteTodo(number) }>
                      削除する
                    </button>
                    <br/>
                  </div>
                }
                </>
              )
            })}
          </div>



        </main>
        <footer></footer>
      </>
    )
  }
}


