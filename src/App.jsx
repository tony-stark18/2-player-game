import "./App.css";
import { useState } from "react";

function App() {
  const n = 3;
  const [turn, setTurn] = useState(false); // false = 'X', true = 'O'
  const [grid, setGrid] = useState(
    Array.from({ length: n }, () => Array(n).fill(""))
  );
  const [gameOver, setGameOver] = useState(false);

  function handleValue(row, col) {
    if (grid[row][col] !== "" || gameOver) return;

    const newGrid = grid.map((row) => [...row]);
    newGrid[row][col] = turn ? "O" : "X";
    setGrid(newGrid);

    const result = check();
    if (result !== -1) {
      setGameOver(true);
    }
    setTurn(!turn);
  }

  function check() {
    for (let i = 0; i < n; i++) {
      if (
        grid[i][0] !== "" &&
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2]
      ) {
        return grid[i][0] === "X" ? 0 : 1;
      }
    }

    for (let i = 0; i < n; i++) {
      if (
        grid[0][i] !== "" &&
        grid[0][i] === grid[1][i] &&
        grid[1][i] === grid[2][i]
      ) {
        return grid[0][i] === "X" ? 0 : 1;
      }
    }

    if (
      grid[0][0] !== "" &&
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2]
    ) {
      return grid[0][0] === "X" ? 0 : 1;
    }
    if (
      grid[0][2] !== "" &&
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0]
    ) {
      return grid[0][2] === "X" ? 0 : 1;
    }

    let isFull = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === "") {
          isFull = false;
          break;
        }
      }
    }
    if (isFull) return 2;

    return -1;
  }

  function resetGame() {
    setGrid(Array.from({ length: n }, () => Array(n).fill("")));
    setTurn(false);
    setGameOver(false);
  }

  const getStatus = () => {
    const result = check();
    if (result === 0) return "X Wins!";
    if (result === 1) return "O Wins!";
    if (result === 2) return "Draw!";
    return `Current Player: ${turn ? "O" : "X"}`;
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatus()}</div>
      <div className="grid">
        <div className="cell cell-1" onClick={() => handleValue(0, 0)}>
          {grid[0][0]}
        </div>
        <div className="cell cell-2" onClick={() => handleValue(0, 1)}>
          {grid[0][1]}
        </div>
        <div className="cell cell-3" onClick={() => handleValue(0, 2)}>
          {grid[0][2]}
        </div>
        <div className="cell cell-4" onClick={() => handleValue(1, 0)}>
          {grid[1][0]}
        </div>
        <div className="cell cell-5" onClick={() => handleValue(1, 1)}>
          {grid[1][1]}
        </div>
        <div className="cell cell-6" onClick={() => handleValue(1, 2)}>
          {grid[1][2]}
        </div>
        <div className="cell cell-7" onClick={() => handleValue(2, 0)}>
          {grid[2][0]}
        </div>
        <div className="cell cell-8" onClick={() => handleValue(2, 1)}>
          {grid[2][1]}
        </div>
        <div className="cell cell-9" onClick={() => handleValue(2, 2)}>
          {grid[2][2]}
        </div>
      </div>
      <button onClick={resetGame} style={{ marginTop: "20px" }}>
        Reset Game
      </button>
    </>
  );
}

export default App;
