import React from "react";
// CSS
import './assets/sass/reset.scss';
import './assets/sass/style.scss';
// npm
import { Transition } from 'react-transition-group';
import { animateScroll as scroll } from 'react-scroll';
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
        {id:1, title: "環境構築", content: "ReactのGatsbyJS(静的サイトジェネレータ)のブログテーマを使用して構築する", open: false, notYet: false, doing: false, review: false,  done: true, edit: false, comment: [], commentForm: false  ,openComment: false,},
        {id:2, title: "GitHubで管理する", content: "gitを使用してGittHubでソースコードを管理する", open: false, notYet: false, doing: false, review: true,  done: false, edit: false, comment: [{text: "OK"}], commentForm: false  ,openComment: false,},
        {id:3, title: "トップページ作成", content: "iTyped、react-modalを使用する、", open: false, notYet: false, doing: false, review: true,  done: false, edit: false, comment: [{text: "○○を修正しましょう"}, {text: "了解です"}], commentForm: false  ,openComment: false,},
        {id:4, title: "各ページ作成", content: "particles、framer-motion、transition-groupを使用してアニメーションを追加する", open: false, notYet: false, doing: false, review: true,  done: false, edit: false, comment: [], commentForm: false  ,openComment: false,},
        {id:5, title: "ブログ機能", content: "gatsby-node.jsからブログ機能作成しCMS投稿、更新できるように設定する", open: false, notYet: false, doing: true, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: false,},
        {id:6, title: "メールフォーム作成", content: "Slack Incoming WebhookのAPIを取得して実装する", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false  ,openComment: false,},
        {id:7, title: "デプロイ", content: "Netlifyを使用してデプロイする", open: false, notYet: true, doing: false, review: false,  done: false, edit: false, comment: [], commentForm: false },
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
        comment: [],     commentForm: false, openComment: true,
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
      data[result].open = false;
    }
    if (value === "review") {
      data[result].review = true;
      data[result].doing = false;
      data[result].open = false;
      
    }
    if (value === "done") {
      data[result].done = true;
      data[result].review = false;
      data[result].open = false;
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
      data[result].open = false;
    }
    if (value == "doing") {
      data[result].doing = true;
      data[result].review = false;
      data[result].open = false;
    }
    if (value === "review") {
      data[result].review = true;
      data[result].done = false;
      data[result].open = false;
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
      data.sort((a, b) => a.id - b.id);
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
    const open_todo = {
      entering: {
        transition: 'all .5s ease',
        opacity: 0,
        transformOrigin: "center",
        transform: "scale(0, 1)"
        
      },
      // バックになった時
      entered: {
        transition: 'all .5s ease',
        opacity: 1,
        transformOrigin: "center",
        transform: "scale(1, 1)"
      },
      // バックからフロントにいく時
      exiting: {
        transition: 'all .5s ease',
        opacity: 0,
        transformOrigin: "center",
        transform: "scale(0, 1)"
      },
      // フロントになった時
      exited: {
        transition: 'all .5s ease',
        opacity: 1,
        transformOrigin: "center",
        transform: "scale(1, 1)"
      }
    }
    return(
      <>
        <Header resetTodo={this.resetTodo} handleTodo={this.handleTodo} openTodo={this.state.openTodo}/>
        <Transition in={openTodo} timeout={500}>
          {state => (
            <div  style={open_todo[state]}>
              { openTodo ?
              <main>
                <Form 
                  openTodo={openTodo} addTodo={this.addTodo}
                  error={error}       handleTodo={this.handleTodo}
                />
              </main>
              :
              <main>
          <TodoList 
            data={data}                  editTodo={this.editTodo}
            editTitle={this.editTitle}   editContent={this.editContent}
            editError={editError}        nextDoing={this.nextDoing}
            changeEdit={this.changeEdit} openTodo={this.openTodo}
            isUp={this.isUp}             isDown={this.isDown}
            el={this.el}
            
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
              }
            </div>
          )}
        </Transition>
      </>
    )
  }
}
