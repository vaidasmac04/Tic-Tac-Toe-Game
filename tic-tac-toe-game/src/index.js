import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	
    return (
      <button
	    className= {props.winnerCoordinate ? "square highlighted" : "square"}
      onClick = {props.onClick}
	  >
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
	  <Square 
	    value={this.props.squares[i]} 
    onClick={() => this.props.onClick(i)}
    winnerCoordinate={this.props.winnerCoordinates && this.props.winnerCoordinates.includes(i)}
		/>
	);
  }

  render() {
    const BOARD_SIZE = 3
    let squares = []

    for(let i = 0; i < BOARD_SIZE; i++){
      let row = []
      for(let j = 0; j < BOARD_SIZE; j++){
        row.push(this.renderSquare(i * BOARD_SIZE + j))
      }
      squares.push(<div class="board-row">{row}</div>)
    }

    return <div >{squares}</div>
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
		  history: [{
        squares: Array(9).fill(null),
        location: [null, null],
		  }],
		  xIsNext: true,
      stepNumber: 0,
      isAscending: false,
	  };
  }
	
  handleClick(i) {
	const history = 
	  this.state.history.slice(0, this.state.stepNumber + 1);
	const current = history[history.length - 1];	
	const squares = current.squares.slice();
	
	if(calculateWinner(squares).symbol || squares[i]){
		return;
	}
	
	squares[i] = this.state.xIsNext ? 'X' : 'O';
	this.setState({
		history: history.concat([{
      squares: squares,
      location: [Math.floor(i/3)+1, i%3+1]
		}]),
		stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
	});
  }	 
  
  handleSortingButtonClick(){
    this.setState({
        isAscending: !this.state.isAscending,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
	
  render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
  const winner = calculateWinner(current.squares);
	
	let moves = history.map((step, move) => {
		const desc = move ? 'Go to move #' + move:
                        'Go to game start';           
		return (
			<li key={move} class={this.state.stepNumber === move ? 'selected-item' : ''}>
          <div class={this.state.stepNumber === move ? 'selected-item' : ''}>
            {desc !== 'Go to game start' ?
              <p>Move location: [{step.location[0]}:{step.location[1]}]</p> :
              <p>Click any square to start playing!</p>
            }
              <button onClick={() => this.jumpTo(move)}> {desc} </button>
          </div>
			</li>
		  );
    });
  
  if(!this.state.isAscending){
    moves.reverse()
  }

	let status;

	if(winner.symbol){
		status = 'Winner: ' + winner.symbol;
  }
  else if(winner.isDraw){
    status = 'Draw';
  }
	else{
		status = 'Next player: ' + 
		  (this.state.xIsNext ? 'X' : 'O');
	}
	
    return (
      <div className="game">
        <div className="game-board">
          <Board 
		    squares={current.squares}
			  onClick={(i) => this.handleClick(i)}
        winnerCoordinates={winner ? winner.coordinates : null}/>
        </div>
        <div className="game-info">
          <div class="status">{status}</div>
          <div class="margin-top margin-bottom margin-left">
            Showing in {this.state.isAscending ? "ascending" : "descending"} order &rarr; <button onClick={() => this.handleSortingButtonClick()}> Change </button>
          </div>
          
          <ol reversed={!this.state.isAscending}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
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
	
      if (squares[a] && squares[a] === squares[b] && 
	           squares[a] === squares[c]) {
        return {
          symbol: squares[a],
          coordinates: lines[i],
          isDraw: false
        };
      }
  }

  let isDraw = true;
  for(let i = 0; i < squares.length; i++){
    if(squares[i] === null){
      isDraw = false;
      break;
    }
  }
  
  return  {
    symbol: null,
    coordinates: null,
    isDraw: isDraw
  };
}