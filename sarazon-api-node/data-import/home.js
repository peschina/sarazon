const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Analog Wall Clock",
  "Chopping Board",
  "Floral Bowls Set",
  "Gray Vase",
  "Green Towels Set",
  "Silver Knife",
  "Vacuum",
  "White Ceramic Mug",
  "White Pillow",
  "Wooden Bar Stool"
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