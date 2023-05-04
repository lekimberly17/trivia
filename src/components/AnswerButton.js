import React from 'react';
import { decodeHTML } from '../lib';

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { answer, handleGuess, guessed, guess } = this.props;
    const isCorrect = guessed && answer === guess;
    return (
      <button
        onClick={() => handleGuess(answer)}
        className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-primary'}`}
      >
        {decodeHTML(answer)}
      </button>
    );
  }
}

export { AnswerButton };
