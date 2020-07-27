import React, { Component } from 'react';
import quizQuestions from "./quizQuestions";
import QuestionBox from "./components/QuestionBox";

class nz_questionaire extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
    counter: 30
  };

  getQuestions = () => {
    quizQuestions().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if(answer===correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
   }
   this.setState({
     responses: this.state.responses < 5 ? this.state.responses + 1 : 5
   });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render(){
    return(
      <div className="container">
        <div className="title">
          New Zealand General Knowledge Quiz
        </div>
        <div className="questions">     
          {this.state.questionBank.map(
              ({question, answers, correct, questionId}) => (
                <QuestionBox
                  question={question}
                  options={answers}
                  key={questionId}
                  selected={answer => this.computeAnswer(answer, correct)}
                  />
              )  
            )}
        </div>
      </div>
    )
  }
}

export default nz_questionaire;
