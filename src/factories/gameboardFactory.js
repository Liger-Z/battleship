import ship from './shipFactory';
import PubSub from '../../node_modules/pubsub-js';

/* Clicking on board tile should flip it's occupied status
*/

const gameboard = () => {
  let board = [];
  let shipList = [];
  let attackList = [];

  const createBoard = () => {
    for (let x=0; x < 10; x++) {
      for (let y=0; y < 10; y++) {
        let newTile = tile(x, y, false, null, false);
        board.push(newTile);
      };
    };
  };
  
  const placeShip = position => {
    const newShip = ship(position);
    
    position.forEach(coordinate => {
      const index = board.findIndex(tile => {
        return tile.position === coordinate;
      });
  
      board[index].occupied = true;
      board[index].ship = newShip;
    });

    shipList.push(newShip);
    return newShip;
  };

  // check if co-ordinate matches co-ordinate of any ship
  const receiveAttack = coordinate => {
    const index = board.findIndex(tile => {
      return tile.position === coordinate;
    });

    if (board[index].occupied === true) {
      board[index].ship.hit();
      board[index].ship.isSunk();
    };

    board[index].attacked = true;
    attackList.push(coordinate);
  };

  const allSunk = () => {
    let counter = 0;
    shipList.forEach(ship => {
      if (ship.isSunk()) {
        counter += 1;
      };
    });

    if (counter === shipList.length) {
      return true;
    }

    return false;
  };

  PubSub.subscribe('ATTACK', (msg, data) => {
    receiveAttack(data);
  });

  return {
    createBoard,
    placeShip,
    receiveAttack,
    board,
    allSunk,
    attackList,
  };
};

// tile is used as the building blocks for the gameboard
const tile = (x, y, occupied, ship, attacked) => {
  const position = `${x}, ${y}`;
  return {position, occupied, ship, attacked};
};

// let board = [
//   ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
//   ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'A7', 'B8', 'B9'],
//   ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
//   ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
//   ['E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
//   ['F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
//   ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
//   ['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'],
//   ['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'],
//   ['J0', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9'],
// ]

export default gameboard;