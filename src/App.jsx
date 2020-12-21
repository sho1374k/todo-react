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
        {id:1, title: "タイトル1", content: "コンテンツ1", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: true,},
        {id:2, title: "タイトル2", content: "コンテンツ2", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: true,},
        {id:3, title: "タイトル3", content: "コンテンツ3", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: true,},
        {id:4, title: "タイトル4", content: "コンテンツ4", open: false, notYet: false, doing: false, review: true,  done: false, edit: false, comment: [{text: "aaa"},], commentForm: false  ,openComment: false,},
        {id:5, title: "タイトル5", content: "コメントのON、OFFの切り替え実装", open: false, notYet: false, doing: true, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: true,},
        {id:6, title: "タイトル6", content: "コンテンツ6", open: false, notYet: false, doing: false, review: false,  done: true, edit: false, comment: [{text: "コメント１"}, {text: "コメント2"}], commentForm: false  ,openComment: false,},
        {id:7, title: "タイトル7", content: "コンテンツ7", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false },
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
    };

    this.addTodo = this.addTodo.bind(this);              //タスク投稿
    this.deleteTodo = this.deleteTodo.bind(this);        //タスク削除
    this.handleTodo = this.handleTodo.bind(this);        //タスク投稿モーダル表示切り替え
    this.openTodo = this.openTodo.bind(this);            //タスクのデスクリプションの表示切り替え

    this.isNext = this.isNext.bind(this);                //処理関数
    this.nextDoing = this.nextDoing.bind(this);          //doing移動
    this.nextReview = this.nextReview.bind(this);        //レビュー移動
    this.nextDone = this.nextDone.bind(this);            //完了移動

    this.isPrev = this.isPrev.bind(this);                //処理関数
    this.prevTodo = this.prevTodo.bind(this);            //doing移動
    this.prevDoing = this.prevDoing.bind(this);          //レビュー移動
    this.prevReview = this.prevReview.bind(this);        //完了移動

    this.resetTodo = this.resetTodo.bind(this);          //リセット
  
    this.changeEdit = this.changeEdit.bind(this);        //編集モード切り替え
    this.editTitle = this.editTitle.bind(this);          //タイトル変更アクション
    this.editContent = this.editContent.bind(this);      //コンテント変更アクション
    this.editTodo = this.editTodo.bind(this);            //タスク変更submit
    
    this.addComment = this.addComment.bind(this);        //コメント追加
    this.changeComment = this.changeComment.bind(this);  //コメントモード
    this.deleteComment = this.deleteComment.bind(this);  //コメント削除
    this.handleCommnet = this.handleCommnet.bind(this);  //コメント表示切り替え

    this.isUp = this.isUp.bind(this);                    //idアップ
    this.isDown = this.isDown.bind(this);                //idダウン
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
        title: title,    content: content,   open:false,      edit: false,
        notYet: true,    doing: false,       review: false,   done: false,
        commemt: [],     commentForm: false, openComment: true,
      })
      // 更新
      this.setState({
        data: data,
        error: {
          errorTitle: false,
          errorContent: false,
        },
        commentError: false,
        openTodo: false,
      })
    }
    // フォームのリセット
    event.target.title.value = "";
    event.target.content.value = "";
  }

  /**
   * タスク詳細opne
   * @param number //タスクid
   */
  openTodo(number){
    const data = this.state.data.slice();
    // 変更するタスクのidを検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].open = !data[result].open;
    this.setState({
      data: data
    })
  }

  /**
   * 次のタスクへ
   * @param value //リスト判断の値
   * @param number //タスクのid 
   */
  isNext(value, number) {
    const data = this.state.data.slice();
    // 実行中に移動させるタスクのidを連想配列から検索
    const result = data.findIndex(({id}) => id === Number(number));
    if (value ===  "doing") {
      data[result].doing = true;
      data[result].notYet = false;
    }
    if (value === "review") {
      data[result].review = true;
      data[result].doing = false;
    }
    if (value === "done") {
      data[result].done = true;
      data[result].review = false;
    }
    this.setState({
      data: data
    })
   }
   nextDoing(number){
     this.isNext("doing",number);
   }
   nextReview(number){
    this.isNext("review",number);
  }
  nextDone(number){
    this.isNext("done",number);
  }

  /**
   * 前のタスクへ
   * @param value //リスト判断の値
   * @param number //タスクのid 
   */
  isPrev(value, number){
    const data = this.state.data.slice();
    const result = data.findIndex(({id}) => id === Number(number));
    if (value === "todo") {
      data[result].notYet = true;
      data[result].doing = false;
    }
    if (value == "doing") {
      data[result].doing = true;
      data[result].review = false;
    }
    if (value === "review") {
      data[result].review = true;
    data[result].done = false;
    }
    this.setState({
      data: data,
    })
  }
  prevTodo(number){
    this.isPrev("todo", number);
  }
  prevDoing(number){
    this.isPrev("doing", number);
  }
  prevReview(number){
    this.isPrev("review", number);
  }

  /**
   * タスクを削除する
   * @param number  // タスクのid
   */
  deleteTodo(number){
    const bool = window.confirm("タスクを削除しますか？");
    if (bool === true) {
      const data = this.state.data.slice();
      // 削除したいタスクのidを連想配列から検索
      const result = data.findIndex(({id}) => id === Number(number));
      // 配列のresult番目を1つ切り取る
      data.splice(result, 1);
      this.setState({
        data: data
      })
    }
  }
  // リセット
  resetTodo(){
    const data = this.state.data.slice();
    const bool = window.confirm("本当にリセットしますか？");
    if (bool === true) {
      data.length = 0;
      this.setState({
        data: data
      })
    }
  }

  /** 変更フォームに切り替える
   * @param number //タスクid
   */
  changeEdit(number){
    const data = this.state.data.slice();
    // 変更するタスクのidを検索
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].edit = !data[result].edit;
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
      data[result].openComment = true;
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

  /**
   * 投稿モーダル表示、非表示
   */
  handleTodo(){
    this.setState({
      openTodo: !this.state.openTodo,
    })
  }

  /**
   * コメント表示切り替え
   * @param number //タスクのid 
   */
  handleCommnet(number){
    const data = this.state.data.slice();
    const result = data.findIndex(({id}) => id === Number(number));
    data[result].openComment = !data[result].openComment;
    this.setState({
      data: data,
    })
  }

  /**
   * タスク上下
   * @param number //タスクのid
   */
  isUp(number){
    const data = this.state.data.slice();
    // データをid順に並び替え
    data.sort((a, b) => a.id - b.id);
    // idと一致する配列番号検索
    const result = data.findIndex(({id}) => id === Number(number));
    // タスクのidを+1UP
    data[result].id = data[result].id + 1;
    // 次のタスクを-1Down
    data[result+1].id = data[result+1].id -1;
    // idを変更後idを並び替え
    data.sort((a, b) => a.id - b.id);
    this.setState({
      data: data,
    })
  }
  isDown(number){
    const data = this.state.data.slice();
    data.sort((a, b) => a.id - b.id);
    const result = data.findIndex(({id}) => id === Number(number));
    // タスクidを-1
    data[result].id = data[result].id-1;
    // 前のタスクを+1
    data[result-1].id = data[result].id+1;
    data.sort((a, b) => a.id - b.id);
    this.setState({
      data: data,
    })
  }
  render(){
    const {data, error, editError, commentError, openTodo} = this.state;
    return(
      <>
        <Header resetTodo={this.resetTodo} handleTodo={this.handleTodo} />
        <main>
          <Form 
            openTodo={openTodo} addTodo={this.addTodo}
            error={error}       handleTodo={this.handleTodo}
          />

          <TodoList 
            data={data}                  editTodo={this.editTodo}
            editTitle={this.editTitle}   editContent={this.editContent}
            editError={editError}        nextDoing={this.nextDoing}
            changeEdit={this.changeEdit} openTodo={this.openTodo}
            isUp={this.isUp}             isDown={this.isDown}
          />

          <Doing 
            data={data}                   editTodo={this.editTodo}
            editTitle={this.editTitle}    editContent={this.editContent}
            editError={editError}         openTodo={this.openTodo}
            nextReview={this.nextReview}  prevTodo={this.prevTodo}
            changeEdit={this.changeEdit}
            isUp={this.isUp}              isDown={this.isDown}
          />

          <Review 
            data={data}                   deleteComment={this.deleteComment}
            nextDone={this.nextDone}      prevDoing={this.prevDoing}
            addComment={this.addComment}  changeComment={this.changeComment}
            commentError={commentError}   handleCommnet={this.handleCommnet}
            isUp={this.isUp}              isDown={this.isDown}
            openTodo={this.openTodo}
          />

          <Done 
            data={data}              deleteTodo={this.deleteTodo}
            isUp={this.isUp}         isDown={this.isDown}
            openTodo={this.openTodo} prevReview={this.prevReview}
          />
        </main>
      </>
    )
  }
}
