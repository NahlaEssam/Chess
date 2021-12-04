import "./chess-holder.css";
import React from "react";
import Chessboard from "chessboardjsx";

function template() {
  return (
    <div className="chess-holder">
      <div className="chess-board-status">
        <div className="status-content">
          <span> Game Status : </span>
          <span className="game-state"> {this.state.gameStatus} </span>
        </div>

      </div>

      <div className="chess-board-container">
        <Chessboard position={this.state.fen}
          squareStyles={this.state.squareStyles}
          darkSquareStyle={this.state.darkSquareStyle}
          lightSquareStyle={this.state.lightSquareStyle}
          dropSquareStyle={this.state.dropSquareStyle}
          boardStyle={this.state.boardStyle}
          onMouseOverSquare={this.onMouseOverSquare}
          onMouseOutSquare={this.onMouseOutSquare}
          onDragOverSquare={this.onDragOverSquare}
          onDrop={this.onDrop}
        ></Chessboard>
      </div>

    </div>
  );
};

export default template;
