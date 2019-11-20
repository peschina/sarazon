const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Acoustic Guitar",
  "Brown Drum",
  "Brown Flute",
  "Colored Xylophone",
  "Electric Guitar"
];
const desc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin ante ligula, id euismod ligula ullamcorper sed.";

const products = names.map(i => {
  return {
    name: i,
    description: desc,
    price: getRandomPrice(),
    numberInStock: getRandomNumber(),
    insertionDate: getRandomDate()
  };
});

module.exports = products;
