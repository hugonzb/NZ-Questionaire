import React, {useState} from "react";

const QuestionBox = ({question, options, selected}) => {
  const [answer, setAnswer] = useState(options);
  const [chosenAnswer, setChosenAnswer] = useState();
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <button
          key={index}
          className="answerBtn"
          onClick={() => {
            setAnswer([]);
            selected(text);
            setChosenAnswer(text);
          }}
        >
          {text}
        </button>
      ))}
        <div className="chosen-answer">
          {chosenAnswer}
        </div>
    </div>
  );
};

export default QuestionBox;