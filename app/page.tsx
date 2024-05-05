"use client";

import { useEffect, useState } from "react";

const gameInitialState = ["", "", "", "", "", "", "", "", ""];
type Players='X' |'O'

export default function Home() {
  const [game_shell, setGame_shell] = useState(gameInitialState);
  const [person, setPerson] = useState<Players>("X");
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    validateGame();
  }, [game_shell]);

  const validateGame = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        (game_shell[a] === "X" &&
          game_shell[b] === "X" &&
          game_shell[c] === "X") ||
        (game_shell[a] === "O" &&
          game_shell[b] === "O" &&
          game_shell[c] === "O")
      ) {
        setIsWon(true);
        break; // If a winning combination is found, no need to check further
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (game_shell[index]) {
      return;
    }
    const newState = [...game_shell];

    if (person === "X") {
      newState[index] = "X";
      setGame_shell(newState);
      setPerson("O");
    } else {
      newState[index] = "O";
      setGame_shell(newState);
      setPerson("X");
    }
  };

  const resetGame = () => {
    setGame_shell(gameInitialState);
    setPerson("X");
    setIsWon(false);
  };

  return (
    <main>
      <button onClick={resetGame}>Reset</button>
      {/* game board */}
      {isWon && <div>{person === "O" ? "X won" : "O won"}</div>}

      <div
        className={`bg-slate-400 grid grid-cols-3 grid-rows-3 gap-4 h-80 w-80 ${
          isWon && "pointer-events-none opacity-40"
        }`}
      >
        {game_shell.map((shell, index) => {
          return (
            <div
              className="bg-green-400 flex items-center justify-center text-6xl cursor-pointer"
              key={index}
              onClick={(event) => handleClick(event, index)}
            >
              {shell}
            </div>
          );
        })}
      </div>
    </main>
  );
}
