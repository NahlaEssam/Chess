import React from "react";
import template from "./chess-holder.jsx";
import Chess from "chess.js";

class ChessHolder extends React.Component {
  state = {
    fen: 'start',
    boardStyle: { border: 'solid 2px black', borderRadius: '5px', boxShadow: 'white 0px 4px 12px 0px' },
    darkSquareStyle: { backgroundColor: 'grey' },
    lightSquareStyle: { backgroundColor: 'white' },
    dropSquareStyle: {},
    gameStatus: '',
    squareStyles: {},
    square: '',
  };

  render() {
    return template.call(this);
  }

  componentDidMount() {
    this.game = new Chess();
  }


  onMouseOverSquare = square => {
    this.setState({ square: square });
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    const squaresToHighlight = moves.map(move => move.to);
    this.highlightSquare(squaresToHighlight);
  };

  onMouseOutSquare = _ => {
    this.setState({ squareStyles: {} });
  }

  onDragOverSquare = square => {
    let moves = this.game.moves({
      square: this.state.square,
      verbose: true
    });

    const validMove = moves.find(move => {
      if (square === move.to || square === this.state.square) {
        return move.to;
      }
      return false;
    });

    if (!validMove) {
      this.setState({ dropSquareStyle: { backgroundColor: 'red', borderRadius: '40px' } });
    } else {
      this.setState({ dropSquareStyle: { backgroundColor: 'green', borderRadius: '40px' } });
    }
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });

    if (move === null) {
      this.setState({ gameStatus: 'Invalid move' });
      return;
    }

    this.setState({
      fen: this.game.fen(),
      gameStatus: this.game.in_checkmate() ? 'checkmat' : this.game.in_check() ? 'check' : this.game.in_draw() ? 'draw' : this.game.in_stalemate() ? 'stalemate' : ''
    });
  }

  highlightSquare = (squaresToHighlight) => {
    const highlightStyles = [...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: { backgroundColor: 'lightgreen', opacity: '.5', borderRadius: '40px' }
          }
        };
      },
      {}
    );

    this.setState({ squareStyles: { ...highlightStyles } });
  };
}

export default ChessHolder;
