function getRandomDate() {
  let date = new Date(
    +new Date(2019, 0, 1) +
      Math.random() * (new Date(2019, 11, 1) - new Date(2019, 0, 1))
  );
  return date.toLocaleDateString();
}

function getRandomNumber() {
  return Math.floor(Math.random() * (51 - 1) + 1);
}

function getRandomPrice() {
  return Math.floor(Math.random() * (90 - 3) + 3);
}

exports.getRandomDate = getRandomDate;
exports.getRandomNumber = getRandomNumber;
exports.getRandomPrice = getRandomPrice;
