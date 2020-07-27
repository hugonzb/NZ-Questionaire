import React, { Component } from 'react';
import quizQuestions from "./quizQuestions";
import QuestionBox from "./components/QuestionBox";
import Result from './components/Result';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

class nz_questionaire extends Component {
  state = {
    questionBank: [],
    answerBank: [],
    score: 0,
    responses: 0,
    counter: 60
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
    } else {
        this.state.answerBank.push(answer);
    }
   this.setState({
     responses: this.state.responses < 5 ? this.state.responses + 1 : 5
   });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
      counter: 60,
      answerBank: []
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render(){
    const answers = this.state.answerBank.map(answer => {
      return <li>{answer}</li>;
    });
    return(
      <div className="container">
        <div className="title">
          New Zealand General Knowledge Quiz
        </div>
        <div className="sub-title">
          Developed by Hugo Baird
        </div>
        {this.state.questionBank.length > 0 && this.state.responses < 5 ? (        
        <div> 
          <div className="questions">     
          <div className="timer-container">
            <div className="timer">
              <CountdownCircleTimer
                isPlaying={true}
                size= "115"
                duration={this.state.counter}
                colors={[["#004777", 0.13], ["#F7B801", 0.13], ["#A30000"]]}
                onComplete={() => { this.setState({
                  responses: 5
                }) 
                }}
              >
                {({ remainingTime }) => 
                <div>
                  <div>{remainingTime}</div>
                  <div>Seconds</div>
                </div>}
              </CountdownCircleTimer>
            </div>
          </div>
          <div>
            {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(
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
        </div>
        ): null }
        {this.state.responses === 5 ? (
        <div>
            <Result score={this.state.score} playAgain={this.playAgain} />
          Incorrect:
          <ul>
            {answers}
          </ul>
      </div>): null}
      </div>
    )
  }
}

export default nz_questionaire;
