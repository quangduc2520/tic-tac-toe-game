import { GAME_STATUS, CELL_VALUE } from "./constants.js";


export function checkGameStatus(cellValues) {
  
  if (!Array.isArray(cellValues) || cellValues.length !== 9) {
    throw new Error("Invalid cell values");
  }

  
  const checkSetList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  const winSetIndex = checkSetList.findIndex((set) => {
    const first = cellValues[set[0]];
    const second = cellValues[set[1]];
    const third = cellValues[set[2]];

    return first !== "" && first === second && second === third;
  });

  if (winSetIndex >= 0) {
    const winValueIndex = checkSetList[winSetIndex][1];
    const winValue = cellValues[winValueIndex];

    return {
      status:
        winValue === CELL_VALUE.CIRCLE ? GAME_STATUS.O_WIN : GAME_STATUS.X_WIN,
      winPositions: checkSetList[winSetIndex],
    };
  }

  
  const isEndGame = cellValues.filter((x) => x === "").length === 0;
  return {
    status: isEndGame ? GAME_STATUS.ENDED : GAME_STATUS.PLAYING,
    winPositions: [],
  };
}