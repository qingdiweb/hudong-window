
import React,{Component} from 'react'

import './QuestionDetail.less'
import QuestionFetch from "../../expand/api/QuestionFetch";
import {MathJaxHub} from "../../utils/MathJaxUtil";

const  optionsNub=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

export default  class QuestionDetail extends  Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            magnification:100,
            singleStep:10,
            data:null,
        };

        let magnification = localStorage.getItem("magnification");
        console.log('magnification',magnification,parseInt(magnification));
        if (!!magnification&&!!parseInt(magnification))
        {
            this.state.magnification = parseInt(magnification);
        }
         this.questionFetch =  new QuestionFetch();
      }
      componentWillMount() {

          let questionId = this.props.questionId;
          let loginToken = this.props.loginToken;
          this.questionFetch.questionDetail(loginToken,questionId).then((result)=>{

              console.log('questionDetail',result);
              this.setState({
                  data:result[0],
              },()=>{
                  MathJaxHub();
              })

          }).catch((error)=>{

              console.log('error',error);

          });
      }
      componentDidMount() {

      }
      render(){

          let questionId = this.props.questionId;
          let loginToken = this.props.loginToken;

          console.log('questionId',questionId,loginToken,this.state.magnification);

          return <div className='question-detail'>
              <div className='head'>
                  <img className='enlarge' src={require('../../res/img/enlarge.png')} alt="enlarge" onClick={this.enlargeClick.bind(this)}/>
                  <div className='magnification'>{this.state.magnification+'%'}</div>
                  <img className='narrow' src={require('../../res/img/narrow.png')}  alt="narrow" onClick={this.narrowClick.bind(this)}/>
              </div>
              {this.showBigQuestion.bind(this)()}
              <div className='divider'></div>
              {this.showSubtopic.bind(this)()}
          </div>
      }

      showBigQuestion(){
          if (!this.state.data)
          {
              return null;
          }
          let scaleFont = (this.state.magnification-100)/10 *2;
          let img = 'img'+(this.state.magnification/10);
          return <div className='big-question'>
              <div className={'cont-title ' + img} style={{fontSize:15+scaleFont}}><span className="topic-type">({this.state.data.category})</span><span dangerouslySetInnerHTML={{ __html: this.state.data.title }}></span></div>
              <div  className='parent-option-cont'>
                  {
                      this.state.data.options&& this.state.data.options!==''&& JSON.parse(this.state.data.options).map((ele,i)=>{
                          return <div className='question-xuan-xiang-root' style={{fontSize:14+scaleFont}} key={i}>
                              <span className="option">{optionsNub[i]}</span>
                              <span className={'option-cont-html '+ img}dangerouslySetInnerHTML={{ __html: ele }}></span>
                          </div>
                      })
                  }
              </div>
          </div>
      }
      showSubtopic(){
          if (!this.state.data)
          {
              return null;
          }
          let childQuestionId = this.props.childQuestionId;
          console.log('childQuestionId',childQuestionId);
          if (!!this.state.data.childQuestionInfoList&&this.state.data.childQuestionInfoList.length &&!!childQuestionId)
          {
              let childQuestionIndex = -1;
              let currentChildQuestion = null;
              for(let i=0;i<this.state.data.childQuestionInfoList.length;i++)
              {
                  let temp = this.state.data.childQuestionInfoList[i];
                  if (temp.id.toString() === childQuestionId)
                  {
                      childQuestionIndex = i +1;
                      currentChildQuestion = temp;
                      break;
                  }
              }
              if (childQuestionIndex===-1)
              {
                  return;
              }
              let scaleFont = (this.state.magnification-100)/10 *2;
              let img = 'img'+(this.state.magnification/10);

              return <div className='sub-topic'>
                  <div className='sub-topic-title' style={{fontSize:16+scaleFont}}>多问题（{childQuestionIndex}/{this.state.data.childQuestionInfoList.length}）</div>
                  <div className={'sub-cont-title ' + img} style={{fontSize:15+scaleFont}}><span className="sub-topic-type">({currentChildQuestion.category})</span><span dangerouslySetInnerHTML={{ __html: currentChildQuestion.title }}></span></div>
                  <div  className='sub-option-cont'>
                      {
                          currentChildQuestion.options&& currentChildQuestion.options!==''&& JSON.parse(currentChildQuestion.options).map((ele,i)=>{
                              return <div className='sub-question-xuan-xiang-root' style={{fontSize:14+scaleFont}} key={i}>
                                  <span className="sub-option">{optionsNub[i]}</span>
                                  <span className={'sub-option-cont-html '+ img}dangerouslySetInnerHTML={{ __html: ele }}></span>
                              </div>
                          })
                      }
                  </div>
              </div>
          }
      }
    enlargeClick(){
          console.log('enlargeClick');
          if (this.state.magnification <= 500-this.state.singleStep)
          {
              let magnification = this.state.magnification+this.state.singleStep;
              this.setState({
                  magnification:magnification,
              });
              localStorage.setItem("magnification",magnification+'');//放大率
          }
      }

    narrowClick(){
        console.log('narrowClick');
        if (this.state.magnification >= 20+this.state.singleStep)
        {
            let  magnification = this.state.magnification-this.state.singleStep;
            this.setState({
                magnification:magnification,
            });
            localStorage.setItem("magnification",magnification+'');//放大率
        }
      }


}
