import PubSub from '../../node_modules/pubsub-js';

const player = () => {
  const attack = (coordinate) => {
    PubSub.publishSync('ATTACK', coordinate);
  }

  return { attack };
}

const AI = () => {
  let coordinateList = [];
  for (let x=0; x < 10; x++) {
    for (let y=0; y < 10; y++) {
      coordinateList.push(`${x}, ${y}`);
    };
  };

  const randomCoordinate = () => {
    const index = Math.floor(Math.random() * coordinateList.length) - 1;
    return coordinateList.splice(index, 1)[0];
  }

  const attack = () => {
    const coordinate = randomCoordinate();
    PubSub.publishSync('ATTACK', coordinate);
  };

  return { attack };
};

export default player;
export { player, AI };