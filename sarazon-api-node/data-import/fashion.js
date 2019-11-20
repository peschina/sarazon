const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Floral Skirt",
  "Gray Coat",
  "Green Bikini",
  "Orange Long-sleeved Dress",
  "Pink Dress",
  "Red Bikini",
  "Red Floral Skirt"
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
