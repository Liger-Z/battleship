// This will be where the ship objects are produced

/* Create ship with desired co-ordinates 
A ship will be an array of co-ordinates.
The gameboard will send an alert whenever a co-ordinate is fired upon.
On hit the ship will increase a counter to track how many times it was hit.
When the hit count is equal to the length of the ship, the ship will be sunk.
*/
const ship = (position) => {
  let hitCount = 0;

  const hit = () => {
    if (isSunk() === true) {
      throw new Error('This ship is already sunk');
    };
    hitCount += 1;
  };

  const isSunk = () => {
    if (hitCount === position.length) {
      return true;
    };

    return false;
  };


  return {
    position,
    hit,
    isSunk,
  };
};

export default ship;