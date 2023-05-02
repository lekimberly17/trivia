import React, { useState } from 'react';
import { AnswerButton } from './index';
import { decodeHTML, randomizeArray } from '../lib';

const Question = ({ question }) => {
  const { category, question: questionText, correct_answer, incorrect_answers } = question;

  const answers = randomizeArray([...incorrect_answers, correct_answer]);

  const [guessed, setGuessed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleGuess = answer => {
    setIsCorrect(answer === correct_answer);
    setGuessed(true);
  };

  return (
    <div className='card p-2 mb-4'>
      <h3 className='fw-lighter fs-5 mb-4'>{category}</h3>
      <h4 className='fw-light fs-5 mb-4'>{decodeHTML(questionText)}</h4>
      <div>
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            handleGuess={handleGuess}
            disabled={guessed}
          />
        ))}
      </div>
      {guessed && (
        <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'}`}>
          {isCorrect ? 'Correct!' : `Incorrect! The correct answer is ${correct_answer}`}
        </div>
      )}
    </div>
  );
};

export default Question;
