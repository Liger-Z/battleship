import ship from './shipFactory';

test('Cruiser will sink in three hits', () => {
  const cruiser = ship(['A0', 'A1', 'A2']);
  cruiser.hit();
  cruiser.hit();
  cruiser.hit();
  expect(cruiser.isSunk()).toBe(true);
});

test('Cruiser will not sink in two hits', () => {
  const cruiser = ship(['A0', 'A1', 'A2']);
  cruiser.hit();
  cruiser.hit();
  expect(cruiser.isSunk()).toBe(false);
});

test('Destroyer will sink in two hits', () => {
  const destroyer = ship(['C3', 'D3']);
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(true);
});

test('If ship is sunk, then running hit() should throw an error', () => {
  const destroyer = ship(['C3', 'D3']);
  destroyer.hit();
  destroyer.hit();
  expect(() => {destroyer.hit()}).toThrow(Error);
});
