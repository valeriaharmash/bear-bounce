const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const detectCollision = (objOne, objTwo) => {
  const oOne = objOne.getBounds();
  const oTwo = objTwo.getBounds();
  return (
    oOne.x + oOne.width > oTwo.x &&
    oOne.x < oTwo.x + oTwo.width &&
    oOne.y + oOne.height > oTwo.y &&
    oOne.y < oTwo.y + oTwo.height
  );
};

export { randomNumberBetween, detectCollision };
