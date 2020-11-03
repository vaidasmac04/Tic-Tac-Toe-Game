import React from 'react';
import './index.css';
import Square from './Square.js';

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

  export default Board;