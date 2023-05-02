import React, { Component } from 'react';
import { Question } from './components';

const category = ''; // You can set this to a specific category ID to get questions from a specific category
const TRIVIA_API = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=easy`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null
    };
  }

  componentDidMount() {
    fetch(TRIVIA_API)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ question: data.results[0] });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { question } = this.state;
    return (
      <div className='container l:w-50 p-5'>
        <h1 className='display-1'>Trivia</h1>
        <h2 className='fw-lighter fs-5 mb-4'>
          (we couldn&lsquo;t think of a better name,{' '}
          <span className='fw-bolder'>sorry</span>)
        </h2>
        <hr />
        <div>
          {question && <Question question={question} />}
        </div>
      </div>
    );
  }
}

export { App };