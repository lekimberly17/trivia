import React, { Component } from 'react';
import { Question } from './components';
import { categories } from './lib/categories';
import { decodeHTML, randomizeArray } from './lib';

const TRIVIA_API = 'https://opentdb.com/api.php';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      selectedCategory: categories[0].id,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    fetch(`${TRIVIA_API}?amount=5&category=${this.state.selectedCategory}&difficulty=easy&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: randomizeArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
        this.setState({ questions });
      });
  };

  handleCategoryChange = (event) => {
    this.setState(
      { selectedCategory: event.target.value },
      this.fetchQuestions
    );
  };

  handleGuess = (questionIndex, answer) => {
    const { questions } = this.state;
    const isCorrect = answer === questions[questionIndex].correct_answer;
    questions[questionIndex].guessed = true;
    questions[questionIndex].guess = answer;
    questions[questionIndex].isCorrect = isCorrect;
    this.setState({ questions });
  };

  render() {
    const { questions, selectedCategory } = this.state;

    return (
      <div className='container l:w-50 p-5'>
        <h1 className='display-1'>Trivia</h1>
        <h2 className='fw-lighter fs-5 mb-4'>
          (we couldn&lsquo;t think of a better name,{' '}
          <span className='fw-bolder'>sorry</span>)
        </h2>
        <hr />
        <div className='mb-4'>
          <label htmlFor='categorySelect' className='form-label'>
            Select Category:
          </label>
          <select
            id='categorySelect'
            className='form-select'
            value={selectedCategory}
            onChange={this.handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.value}
              </option>
            ))}
          </select>
        </div>
        {questions.map((question, index) => (
          <div key={index} className='mb-4'>
            <Question
              question={question}
              handleGuess={(answer) => this.handleGuess(index, answer)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export { App };
