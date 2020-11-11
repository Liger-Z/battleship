import { player, AI } from './playerFactory';
import gameboard from './gameboardFactory';

test('Players should be able to attack a co-ordinate on the gameboard', () => {
  const newBoard = gameboard();
  newBoard.createBoard();
  newBoard.placeShip(['3, 4', '4, 4']);

  const player1 = player();
  player1.attack('3, 4');
  player1.attack('4, 4');

  expect(newBoard.allSunk()).toBe(true);
})

test('AI should be able to attack a random co-ordinate', () => {
  const newBoard = gameboard();
  newBoard.createBoard();
  
  const player1 = AI();
  player1.attack();
  
  expect(newBoard.attackList).toHaveLength(1);
})