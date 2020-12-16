import React from "react";
// CSS
import './assets/sass/reset.scss';
import './assets/sass/style.scss';
// Components
import {Header} from "./components/header/header";
import {Form} from "./components/form/form";
import {TodoList} from "./components/todo/todo-list";
import {Doing} from "./components/todo/doing";
import {Review} from "./components/todo/review";
import {Done} from "./components/todo/done";

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[
        {id:1, title: "タイトル1", content: "コンテンツ1", notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false },
        {id:2, title: "タイトル2", content: "コンテンツ2", notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false },
        {id:3, title: "タイトル3", content: "コンテンツ3", notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false },
        {id:4, title: "タイトル4", content: "コンテンツ4", notYet: false, doing: false, review: true,  done: false, edit: false, comment: [{text: "aaa"},], commentForm: false },
        {id:5, title: "タイトル5", content: "コンテンツ5", notYet: false, doing: true, review: false,  done: false, edit: false, comment: [], commentForm: false },
        {id:6, title: "タイトル6", content: "コンテンツ6", notYet: true, doing: false, review: true,  done: false, edit: false, comment: [{text: "コメント１"}, {text: "コメント2"}], commentForm: false },
        {id:7, title: "タイトル7", content: "コンテンツ7", notYet: true, doing: false, review: false,  done: true, edit: false, comment: [], commentForm: false },
      ],
      error:{
        errorTitle: false,
        errorContent: false
      },
      editError:{
        errorTitle: false,
        errorContent: false
      },
      commentError: false,
      openTodo: false,
      openComment: false,
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

    this.addComment = this.addComment.bind(this);

    this.changeComment = this.changeComment.bind(this);

    this.deleteComment = this.deleteComment.bind(this);

    this.handleTodo = this.handleTodo.bind(this);
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
        notYet: true,
        doing: false,
        review: false,
        done: false,
        edit: false,
        commemt: [],
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

  /**
   * コメント追加
   * @param number //タスクid
   * @param event //入力値
   */
  addComment(event, number){
    event.preventDefault();
    const data = this.state.data.slice();
    

    const commentValue = event.target.comment.value;
    if (commentValue === "") {
      this.setState({
        commentError: true,
      })
    } else {
      const result = data.findIndex(({id}) => id === Number(number));

      data[result].comment.push({
        text: String(commentValue),
      })
      data[result].commentForm = false;

      this.setState({
        data: data,
        commentError: false,
      })
    }
    event.target.comment.value = "";
  }

  /**
   * コメントフォーム変更
   * @param number //タスクid
   */
  changeComment(number){
    const data = this.state.data.slice();
    const result = data.findIndex(({id}) => id === Number(number));
    // data[result].commentForm = true;
    data[result].commentForm = !data[result].commentForm;
    this.setState({
      data: data
    })
  }


  /**
   * コメント削除
   * @param number // タスクid
   * @param i // コメントのkey
   */
  deleteComment(number, i){
    const data = this.state.data.slice();
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].comment.splice(i, 1);
    this.setState({
      data: data
    })
  }

  handleTodo(){
    this.setState({
      openTodo: !this.state.openTodo,
    })
  }

  render(){
    const data = this.state.data;
    const error = this.state.error;
    const editError = this.state.editError;
    const commentError = this.state.commentError;

    const openTodo = this.state.openTodo;

    return(
      <>
        <Header />
        {/* リセットボタン */}
          <div className="">
            <button onClick={() => this.resetTodo()}>リセットする</button>
          </div>
          <button onClick={() => this.handleTodo()}>+</button>

        <main>
          
          

          { openTodo === true &&
            <Form 
              addTodo={this.addTodo}
              error={error}
              handleTodo={this.handleTodo}
            />
          }
          


          {/* リスト表示 */}
          <TodoList 
            data={data}
            editTodo={this.editTodo}
            editTitle={this.editTitle}
            editContent={this.editContent}
            editError={editError}

            changeDoing={this.changeDoing}
            changeEdit={this.changeEdit}
          />

  

          <br/><br/><br/><br/>

          <Doing 
            data={data}
            editTodo={this.editTodo}
            editTitle={this.editTitle}
            editContent={this.editContent}
            editError={editError}

            changeReview={this.changeReview}
            changeEdit={this.changeEdit}
          />
          
          
          <br/><br/><br/><br/>

          {/* 確認まちタスク */}
          <Review />
          <h1>Review List</h1>
          <div className="">
            {data.map((todo, i) => {
              let number = todo.id;
              let commentArray = todo.comment.slice();
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
                    {!(commentArray.length === 0) &&
                      commentArray.map((comment, i) => {
                        return(
                          <div className="" key={i}>
                            {comment.text}
                            <br/>
                            <button onClick={() => this.deleteComment(number, i)}>コメント削除</button>
                          </div>

                        )
                      })
                    }
                   
                    <button onClick={() => this.changeDone(number)}>
                      完了する
                    </button>
                    <br/>
                    {todo.commentForm === true ?
                    <>
                    <form onSubmit={(event) => this.addComment(event, number)}>
                      <input type="text" name="comment"/>
                      {commentError === true &&
                        <div className="">
                          コメントを入力してください
                        </div>
                      }
                      <button type="submit" >コメントを追加する</button>
                      <button onClick={() => this.changeComment(number)}>閉じる</button>
                    </form>
                    
                    </>
                    :
                    <button onClick={() => this.changeComment(number)}> 
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

          <br/><br/><br/><br/>
          
          {/* 完了タスク */}
          <Done />
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
      </>
    )
  }
}
