import React, { Component } from 'react';
import './App.less';
import './res/styles/commonStyle.less'
import QuestionDetail from "./containers/questionDetail/QuestionDetail";


class App extends Component {
  render() {

      let type = GetQueryString('type');

      if (!!type)
      {
          //type=questionDetail&questionId=100
          return <div>
              测试{type}
          </div>
      }
      //questionId=20282307&loginToken=a315888ff3051032cf94ed8650ce207a&childQuestionId=20282309
      let questionId = GetQueryString('questionId');
      let loginToken = GetQueryString('loginToken');
      let childQuestionId = GetQueryString('childQuestionId');
      return (
          <QuestionDetail questionId = {questionId} loginToken={loginToken} childQuestionId={childQuestionId}/>
      );
  }
}

/**
 * 获取地址栏参数方法
 * @return {string}
 */
function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null)
        return decodeURI(r[2]);
    return null;
}


export default App;
