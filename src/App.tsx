import { useState, useEffect } from "react";
import "./App.css";

type BingoCell = {
  value: string;
  marked: boolean;
};

// Static list of items for the bingo game
// Users can customize this list with their own items
const BINGO_ITEMS = [
  "Technical difficulties",
  "AndyMark Goat",
  "We'll reveal the game, but first",
  "\"Hardest fun you can have\"",
  "\"The Sport for the Mind\"",
  "Dean's List winners",
  "Spotlight on FIRST employee",
  "Animated robots are impossible",
  "Animated robots break game rules",
  "Space Force commercial",
  "Haas advertisement",
  "Dozer",
  "Safety animation winner",
  "Coopertition mentioned",
  "FLL and/or FTC mentioned",
  "Someone makes a pun on the game name",
  "REBUILT not at all a relevant name",
  "Game piece is a ball",
  "Student interviews",
  "Tribute to Dr. Woodie Flowers",
  "Water game reference",
  "Dean Kamen goes on a long tangent",
  "Dean \"excited to see\" something",
  "Reference to a past FRC game",
  "Advertisement for a sponsor",
  "Rapid cuts among many images",
  "\"Re-imagine the past\"",
  "Shot of last year's champions",
  "Visit Impact winner",
  "You'll be a FIRST alum"
];

function App() {
  const [bingoCard, setBingoCard] = useState<BingoCell[][]>([]);
  const [winner, setWinner] = useState(false);

  // Initialize bingo card
  useEffect(() => {
    generateBingoCard();
  }, []);

  const generateBingoCard = () => {
    const selectedItems = [...BINGO_ITEMS].sort(() => Math.random() - 0.5).slice(0, 24);

    const card: BingoCell[][] = [];
    const iterator = selectedItems[Symbol.iterator]();

    for (let col = 0; col < 5; col++) {
      const column: BingoCell[] = [];

      for (let row = 0; row < 5; row++) {
        // Center cell is free space
        if (col === 2 && row === 2) {
          column.push({ value: "FREE", marked: true });
        } else {
          column.push({ value: iterator.next().value!, marked: false });
        }
      }
      card.push(column);
    }

    setBingoCard(card);
  };

  const toggleCell = (colIndex: number, rowIndex: number) => {
    if (colIndex === 2 && rowIndex === 2) return; // Free space can't be toggled

    const newCard = [...bingoCard];
    const cell = newCard[colIndex][rowIndex];

    newCard[colIndex][rowIndex] = { ...cell, marked: !cell.marked };
    setBingoCard(newCard);
    checkWinner(newCard);
  };

  const checkWinner = (card: BingoCell[][]) => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (card.every((col) => col[row].marked)) {
        setWinner(true);
        return;
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if (card[col].every((cell) => cell.marked)) {
        setWinner(true);
        return;
      }
    }

    // Check diagonals
    if (
      card[0][0].marked &&
      card[1][1].marked &&
      card[2][2].marked &&
      card[3][3].marked &&
      card[4][4].marked
    ) {
      setWinner(true);
      return;
    }

    if (
      card[0][4].marked &&
      card[1][3].marked &&
      card[2][2].marked &&
      card[3][1].marked &&
      card[4][0].marked
    ) {
      setWinner(true);
      return;
    }
  };

  const resetGame = () => {
    generateBingoCard();
    setWinner(false);
  };

  const letters = ["B", "I", "N", "G", "O"];

  return (
    <div className="bingo-game">
      <h1>REBUILT Kickoff Bingo</h1>

      {winner && <div className="winner-banner">🎉 BINGO! YOU WIN! 🎉</div>}

      <div className="game-controls">
        <button onClick={resetGame}>New Game</button>
      </div>

      <div className="bingo-card">
        <div className="card-header">
          {letters.map((letter, i) => (
            <div key={i} className="header-cell">
              {letter}
            </div>
          ))}
        </div>
        <div className="card-body">
          {bingoCard.map((column, colIndex) => (
            <div key={colIndex} className="column">
              {column.map((cell, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`cell ${cell.marked ? "marked" : ""} ${
                    cell.value === "FREE" ? "free" : ""
                  }`}
                  onClick={() => toggleCell(colIndex, rowIndex)}
                >
                  {cell.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
