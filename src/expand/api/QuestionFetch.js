

import ApiUtils from './ApiUtils';

export  default class QuestionFetch{

    // 构造
      constructor() {

      }
      questionDetail(loginToken,questionId){
          let formData = new FormData();
          if (loginToken.length>0)
          {
              formData.append("loginToken",loginToken);
          }
          if (questionId>0)
          {
              formData.append("questionIds",questionId);
          }
          return new Promise((resolve,reject) => {
              ApiUtils.post('/account/teacher/question/find',formData)
                  .then(result => {
                      console.log('result',result);
                      if (result.code === 200)
                      {
                          resolve(result.data);
                      }
                      else {
                          reject(result.error);
                      }
                  })
                  .catch(error => {
                      reject(error);
                  })
          })
      }
}
