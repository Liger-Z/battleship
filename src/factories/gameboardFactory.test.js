import gameboard from './gameboardFactory';

test('Newly created board should have 100 tiles', () => {
  let newBoard = gameboard();
  newBoard.createBoard();
  expect(newBoard.board.length).toBe(100);
});

test('Placing a ship will switch a position to occupied', () => {
  let newBoard = gameboard();
  newBoard.createBoard();
  newBoard.placeShip(['3, 5', '4, 5']);

  const index1 = newBoard.board.findIndex(tile => {
    return tile.position === '3, 5';
  });
  
  const index2 = newBoard.board.findIndex(tile => {
    return tile.position === '4, 5';
  });

  expect(newBoard.board[index1].occupied).toBe(true);
  expect(newBoard.board[index2].occupied).toBe(true);
});

test('Ships can recieve attacks', () => {
  let newBoard = gameboard();
  newBoard.createBoard();
  let newShip = newBoard.placeShip(['3, 5', '4, 5']);

  newBoard.receiveAttack('3, 5');
  newBoard.receiveAttack('4, 5');
  newBoard.receiveAttack('2, 5');
  expect(newShip.isSunk()).toBe(true);
})


test('Gameboard should be able to check when all ships have been sunk', () => {
  let newBoard = gameboard();
  newBoard.createBoard();

  newBoard.placeShip(['3, 5', '4, 5']);
  newBoard.placeShip(['8, 8', '8, 9']);
  newBoard.placeShip(['6, 2', '6, 3', '6, 4']);

  newBoard.receiveAttack('3, 5');
  newBoard.receiveAttack('4, 5');
  newBoard.receiveAttack('8, 8');
  newBoard.receiveAttack('8, 9');
  newBoard.receiveAttack('6, 2');
  newBoard.receiveAttack('6, 3');
  newBoard.receiveAttack('6, 4');

  expect(newBoard.allSunk()).toBe(true);
})