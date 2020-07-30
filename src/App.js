import React, { Component } from 'react';
import quizQuestions from "./quizQuestions";
import QuestionBox from "./components/QuestionBox";
import Result from './components/Result';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSadCry, faHourglassEnd, faFlushed, faThumbsDown, faThumbsUp, faMeh } from "@fortawesome/free-solid-svg-icons";
import githubwhite from './images/github.png';
import linkedinblue from './images/linkedinblue.png';

class nz_questionaire extends Component {
  state = {
    questionBank: [],
    incorrectBank: [],
    correctBank: [],
    score: 0,
    responses: 0,
    counter: 30,
    timedOut: false
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
    window.scrollTo(0, 0);
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
      return <div className="answer">{correct}</div>;
    });
    const incorrects = this.state.incorrectBank.map(incorrect => {
      return <div className="answer">{incorrect}</div>;
    });
    return(
      <div className="container">
        <div className="title">
          New Zealand General Knowledge Quiz
        </div>
        <div className="sub-title">
          Developed by Hugo Baird
        </div>
        <div>
          <a href="https://github.com/hugonzb">
            <img className="github" src={githubwhite} alt="github"></img>
          </a>
          <a href="https://www.linkedin.com/in/hugo-baird/">
            <img className="linkedin" src={linkedinblue} alt="linkedin"></img>
          </a>
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
                colors={[["#004777", 0.5], ["#F7B801", 0.3], ["#A30000", 0.2]]}
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
        window.scrollTo(0, 0),
        <div className="score-board">
          {this.state.timedOut === true ? <div className="red-banner"><FontAwesomeIcon icon={faHourglassEnd}/> 
          &nbsp;YOU RAN OUT OF TIME!</div>:null}
          {this.state.timedOut === false && this.state.score === 0 ? <div className="red-banner"><FontAwesomeIcon icon={faSadCry}/> 
          &nbsp;Zero? Are you kidding me?..</div>:null}
          {this.state.timedOut === false && this.state.score === 1 ? <div className="red-banner"><FontAwesomeIcon icon={faFlushed}/> 
          &nbsp;Well that's embarrasing..</div>:null}
          {this.state.timedOut === false && this.state.score === 2 ? <div className="red-banner"><FontAwesomeIcon icon={faThumbsDown}/> 
          &nbsp;Poor score.. You can do better!</div>:null}
          {this.state.timedOut === false && this.state.score === 3 ? <div className="blue-banner"><FontAwesomeIcon icon={faMeh}/> 
          &nbsp;Average score.. Try again!</div>:null}
          {this.state.timedOut === false && this.state.score === 4 ? <div className="green-banner"><FontAwesomeIcon icon={faThumbsUp}/> 
          &nbsp;Decent score.. Well done!</div>:null}
          {this.state.timedOut === false && this.state.score === 5 ? <div className="green-banner"><FontAwesomeIcon color="gold" icon={faStar} spin/> 
          &nbsp;Perfect score.. Amazing!</div>:null}

          <Result score={this.state.score} playAgain={this.playAgain} />
          <div className="correct-board">
            <div className="correct-header">
              CORRECT
            </div>
            {this.state.correctBank.length === 0 ? <div>You got no correct answers</div>: corrects }
          </div>
          <div className="incorrect-board">
            <div className="incorrect-header">
              INCORRECT
            </div>
            {this.state.incorrectBank.length === 0 ? <div>You got no incorrect answers</div>: incorrects }
          </div>
        </div>): null}
        </div>
    )
  }
}

export default nz_questionaire;
