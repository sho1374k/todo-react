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

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeDone = this.changeDone.bind(this);
    this.changeReview = this.changeReview.bind(this);
    this.resetTodo = this.resetTodo.bind(this);
    this.changeDoing = this.changeDoing.bind(this);

    this.editTitle = this.editTitle.bind(this);
    this.editContent = this.editContent.bind(this);
    this.editTodo = this.editTodo.bind(this);

    this.changeEdit = this.changeEdit.bind(this);
  }

  /**
   * タスク追加
   * @param event //inputの値 
   */
  addTodo(event){
    // イベント取り消し
    event.preventDefault();
    const data = this.state.data.slice();
    const countNum = data.length;
    const title = event.target.title.value;
    const content =  event.target.content.value;

    // バリデ
    if (title === "" && content === "") {
      this.setState({
        error: {
          errorTitle: true,
          errorContent: true,
        }
      })
    } else if (title === "") {
      this.setState({
        error: {
          errorTitle: true,
          errorContent: false,
        }
      })
    } else if (content === "") {
      this.setState({
        error: {
          errorTitle: false,
          errorContent: true,
        }
      })
    } else {
      // バリデ突破！
      data.push({
        id: Number(countNum) + 1,
        title: title,
        content: content,
        review: false,
        done: false,
        edit: false,
        notYet: true,
      })
      // 更新
      this.setState({
        data: data,
        error: {
          errorTitle: false,
          errorContent: false,
        }
      })
    }
    // フォームのリセット
    event.target.title.value = "";
    event.target.content.value = "";
  }

  /**
   * 実行中に移動させる
   * @param number //タスクのid 
   */
  changeDoing(number){
    const data = this.state.data.slice();
    // 実行中に移動させるタスクのidを連想配列から検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].doing = true;
    data[result].notYet = false;
    this.setState({
      data: data
    })

  }

  /**
   * 確認待ちへ移動させる
   * @param number //タスクのid 
   */
  changeReview(number){
    const data = this.state.data.slice();
    // 確認待ちにしたいタスクのidを連想配列から検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].review = true;
    data[result].doing = false;
    this.setState({
      data: data
    })
  }

  /**
   * 完了に移動させる
   * @param number //タスクのidを取得
   */
  changeDone(number){
    const data = this.state.data.slice();
    // 完了したいタスクのidを連想配列から検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].done = true;
    data[result].review = false;
    this.setState({
      data: data,
    })
  }

  /**
   * タスクを削除する
   * @param number  // タスクのid
   */
  deleteTodo(number){
    const data = this.state.data.slice();
    // 削除したいタスクのidを連想配列から検索
    const result = data.findIndex(({id}) => id === Number(number));
    // 配列のresult番目を1つ切り取る
    data.splice(result, 1);
    this.setState({
      data: data
    })
  }

  // リセット
  resetTodo(){
    const data = this.state.data.slice();
    data.length = 0;
    this.setState({
      data: data
    })
  }

  /** 変更フォームに切り替える
   * @param number //タスクid
   */
  changeEdit(number){
    const data = this.state.data.slice();
    // 変更するタスクのidを検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].edit = true;
    this.setState({
      data: data
    })
  }

  /**
   * 編集
   * @param event // 入力されている値
   * @param number // タスクid
   */
  editTitle(event, number){
    const data = this.state.data.slice();
    // 引数でid検索
    const result = data.findIndex(({id}) => id === Number(number));
    const title = event.target.value;
    data[result].title = title;
    this.setState({
      data: data
    })
  }
  editContent(event, number){
    const data = this.state.data.slice();
    //引数でid検索
    const result = data.findIndex(({id}) => id === Number(number));
    const content = event.target.value;
    data[result].content = content;
    this.setState({
      data: data
    })
  }

  /**
   * 変更更新
   * @param event 
   * @param number 
   */
  editTodo(event, number){
    const data = this.state.data.slice();
    // イベント取り消し
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    if (title === "" && content === "") {
      event.target.title.value = "";
      event.target.content.value = "";
      this.setState({
        editError: {
          errorTitle: true,
          errorContent: true,
        }
      })
    } else if (title === "") {
      event.target.title.value = "";
      this.setState({
        editError: {
          errorTitle: true,
          errorContent: false,
        }
      })
    } else if (content === "") {
      event.target.content.value = "";
      this.setState({
        editError: {
          errorTitle: false,
          errorContent: true,
        }
      })
    } else {
      const result = data.findIndex(({id}) => id === Number(number));
      data[result].title = title;
      data[result].contetn = content;
      data[result].edit = false;
      this.setState({
        data: data,
        editError: {
          errorTitle: false,
          errorContet: false
        }
      })
    }
    
  }

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
