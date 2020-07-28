import React, { Component } from 'react';
import quizQuestions from "./quizQuestions";
import QuestionBox from "./components/QuestionBox";
import Result from './components/Result';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

class nz_questionaire extends Component {
  state = {
    questionBank: [],
    incorrectBank: [],
    correctBank: [],
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

  computeAnswer = (question, answer, correctAnswer) => {
    if(answer===correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
      this.state.correctBank.push(question);
    } else {
        this.state.incorrectBank.push(question);
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
      counter: 30,
      timedOut: false,
      incorrectBank: [],
      correctBank: []
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render(){
    const corrects = this.state.correctBank.map(correct => {
      return <div>{correct}</div>;
    });
    const incorrects = this.state.incorrectBank.map(incorrect => {
      return <div>{incorrect}</div>;
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
                  responses: 5,
                  timedOut: true
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
                    selected={answer => this.computeAnswer(question, answer, correct)}
                    />
                )  
              )}
            </div>
          </div>
        </div>
        ): null }
        {this.state.responses === 5 ? (
        <div className="score-board">
          {this.state.timedOut === true ? <div className="timeout">YOU RAN OUT OF TIME</div>:null}
          <Result score={this.state.score} playAgain={this.playAgain} />
          <div className="correct-board">
          CORRECT    
            {this.state.correctBank.length === 0 ? <div>You got no correct answers</div>: corrects }
          </div>
          <div className="incorrect-board">
          INCORRECT  
            {this.state.incorrectBank.length === 0 ? <div>You got no incorrect answers</div>: incorrects }
          </div>
        </div>): null}
        </div>
    )
  }
}

export default nz_questionaire;
