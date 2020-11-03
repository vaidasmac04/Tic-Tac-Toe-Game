import React from 'react';
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

export default Square;