import React from "react";
import { quizData } from "./quizData";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//import { decode } from "jsonwebtoken";
class MainQuizz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    seconds: 10,
    token:''
  };

  loadQuizData = () => {
    // console.log(quizData[0].question)

    this.setState(() => {

      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options


      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
    let aa = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({ seconds: this.state.seconds - 1 })
      }
      else {
        if (!(this.state.currentQuestion === quizData.length - 1)) {
          this.setState({ seconds: 10 })
          this.nextQuestionHandler();
        } else {
          this.finishHandler()
          clearInterval(aa)
        }
      }
    }, 1000);
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
    this.setState({ seconds: 10 })
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }

  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    const payload = {
      score: this.state.score
    }
  //const token = localStorage.getItem('token');
  let token = localStorage.getItem("token");
  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
  //const {email} = tokenn;
  console.log('emaill',decoded)
    fetch("http://localhost:5000/api/answer/submit", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },        
        body: JSON.stringify({
          email:decoded.email,
          result: this.state.score
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          if (user){
           console.log("added" ,this.state.score)
           localStorage.removeItem("token");
           this.props.checkAuth(false)
          }
        })
        .catch((err) => console.log(err.message));
        

    //localStorage.removeItem("token");
    //let token = localStorage.getItem("token");
    //console.log('Null',localStorage.getItem("token"))
   
  };
 
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    if (isEnd) {
      return (
        <div className="result">
          <h3>Game Over your Final score is {this.state.score} points </h3>
          <div>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.questions} </h1>
          <h1>{this.state.seconds} </h1>

          <div id="countdown_div"></div>
          <span>{`Questions ${currentQuestion}  out of ${quizData.length -
            1} remaining `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default MainQuizz;