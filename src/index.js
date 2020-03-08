import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

// class Square extends React.Component {

//     render() {
//       return (
//         <button className="square" onClick={()=>this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }
function Square(props) {

  if(props.isEnd && (props.id==props.a || props.id==props.b || props.id==props.c) ){
    return(
    <button style={{color:'red'}}className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
  }
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props){
  //     super(props);
  //     this.state={
  //         squares:Array(9).fill(null),
  //         xIsNext:true,
  //     }
  // }

  
  renderSquare(i) {
    
    return <Square id ={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}
    a={this.props.a} b={this.props.b} c={this.props.c} isEnd={this.props.isEnd} />;
  }

  render() {
    console.log('winner:'+this.props.isEnd);
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,

    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber:history.length,
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const square = current.squares.slice();
    const winner = calculateWinner(current.squares);
    const abc=calculateWinner2(current.squares);

    const moves = history.map((step, index) => {
      const desc = index ?
        'Go to move #' + index :
        'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if(this.state.stepNumber==9){
        status='There is no winner';
      }
      else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} 
          isEnd={winner} a={abc[0]} b={abc[1]} c={abc[2]}/>
        </div>
        <div className="game-info">
          <div> <u>{status}</u></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
function calculateWinner2(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c];
    }
  }
  return [];
}
serviceWorker.unregister();
