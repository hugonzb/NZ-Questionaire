import React, { Component } from 'react';
import quizQuestions from "./quizQuestions";

class nz_questionaire extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    quizQuestions().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  
  render(){
    return(
      "hello"
    )
  }
}

export default nz_questionaire;
