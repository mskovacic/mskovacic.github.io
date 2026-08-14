import moment from "moment";
import { columnLabel } from "./constants";

export const getCurrentTime = () => moment().format("LTS");

export const getLastElm = (arr) => {
  const length = arr.length;
  const isEmpty = length === 0;
  if (isEmpty) return;
  const lastElm = arr[length - 1];
  return lastElm;
};

export const checkIfSameCoordinate = (
  { row: row1, column: column1 },
  { row: row2, column: column2 }
) => {
  const sameRow = row1 === row2;
  const sameColumn = column1 === column2;
  return sameRow && sameColumn;
};

export const checkIfLstIncludesCoordinate = (
  coordinates,
  checkedCoordinate
) => {
  for (const coordinate of coordinates) {
    const coordinateFound = checkIfSameCoordinate(
      coordinate,
      checkedCoordinate
    );
    if (coordinateFound) return true;
  }
};

export const checkIfSink = (coordinates, shot) => {
  for (const coordinate of coordinates) {
    const isHit = checkIfLstIncludesCoordinate(shot, coordinate);
    if (!isHit) return;
  }
  return true;
};

export const isWinner = (ships, shot) => {
  for (const { coordinates } of ships) {
    const isSink = checkIfSink(coordinates, shot);
    if (!isSink) return;
  }
  return true;
};

export const whichShipCoordinateIsBelong = (ships, checkCoordinate) => {
  for (const index in ships) {
    const { coordinates, name } = ships[index];
    const isOccupied = checkIfLstIncludesCoordinate(
      coordinates,
      checkCoordinate
    );
    if (isOccupied) return name.toLowerCase();
  }
};

const findShipCoordinates = (ships, shipName) => {
  for (const { name, coordinates } of ships) {
    const formattedName = name.toLowerCase();
    const found = formattedName === shipName;
    if (found) return coordinates;
  }
};

export const findSinkShipNameOfCoordinate = (ships, coordinate, shot) => {
  const shipName = whichShipCoordinateIsBelong(ships, coordinate);
  if (!shipName) return;
  const coordinates = findShipCoordinates(ships, shipName);
  const isSink = checkIfSink(coordinates, shot);
  if (!isSink) return;
  return shipName;
};

export const makeNewMessages = (messages, message) => {
  const newMsg = { message, time: getCurrentTime() };
  const newMessages = messages.concat([newMsg]);
  return newMessages;
};

export const makeMsgForWrongTiles = (name, numOfTiles) => {
  return `Wrong number of tiles. A ${name.toLowerCase()} has ${numOfTiles} tiles. Try again.`;
};

export const makeMsgForSelectingTiles = (name, numOfTiles) => {
  return `Select ${numOfTiles} tiles for your ${name.toLowerCase()}.`;
};

export const makeMsgForSinkShip = (isMine, shipName) => {
  const [subject, object] = isMine
    ? ["You", "opponent's"]
    : ["Opponent", "your"];
  return `${subject} has sunk ${object} ${shipName}.`;
};

export const makeMsgForShot = (isMine, ships, coordinate) => {
  const isHit = whichShipCoordinateIsBelong(ships, coordinate);
  const subject = isMine ? "You" : "Opponent";
  const result = isHit ? "HIT!" : "MISSED.";
  const { row, column } = coordinate;
  const columnLetter = columnLabel[column];
  const rowNum = row + 1;
  return `${subject} just shot at ${columnLetter}${rowNum}: ${result}`;
};

export const validateShipTiles = (chosenTiles, var1, var2) => {
  const lst = [];
  const { [var1]: num } = chosenTiles[0];
  for (const { [var1]: val3, [var2]: val4 } of chosenTiles) {
    if (val3 !== num) return;
    lst.push(val4);
  }

  const orderedLst = lst.sort();
  for (let i = 0; i < orderedLst.length - 1; i++) {
    if (orderedLst[i] + 1 !== orderedLst[i + 1]) return;
  }
  return true;
};

/**
 * Generate random ship placements
 * Returns an array of ships with randomly placed coordinates
 */
export const generateRandomShips = (ships) => {
  const board = Array(10).fill(null).map(() => Array(10).fill(false)); // Track occupied tiles
  const placedShips = [];

  for (const ship of ships) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      attempts++;
      
      // Randomly choose horizontal or vertical
      const isHorizontal = Math.random() > 0.5;
      let coordinates = [];
      
      if (isHorizontal) {
        // Place horizontally
        const row = Math.floor(Math.random() * 10);
        const startCol = Math.floor(Math.random() * (10 - ship.numOfTiles + 1));
        
        // Check if all tiles are free
        let canPlace = true;
        for (let col = startCol; col < startCol + ship.numOfTiles; col++) {
          if (board[row][col]) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          // Place the ship
          for (let col = startCol; col < startCol + ship.numOfTiles; col++) {
            board[row][col] = true;
            coordinates.push({ row, column: col });
          }
          placed = true;
        }
      } else {
        // Place vertically
        const col = Math.floor(Math.random() * 10);
        const startRow = Math.floor(Math.random() * (10 - ship.numOfTiles + 1));
        
        // Check if all tiles are free
        let canPlace = true;
        for (let row = startRow; row < startRow + ship.numOfTiles; row++) {
          if (board[row][col]) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          // Place the ship
          for (let row = startRow; row < startRow + ship.numOfTiles; row++) {
            board[row][col] = true;
            coordinates.push({ row, column: col });
          }
          placed = true;
        }
      }
    }

    if (placed && coordinates.length > 0) {
      placedShips.push({
        name: ship.name,
        coordinates
      });
    }
  }

  return placedShips;
};