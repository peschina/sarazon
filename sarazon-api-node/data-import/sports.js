const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Adidas Superstar Sneakers",
  "Nike Flyknit Racer",
  "Spalding Basketball",
  "Teloon Tennis Ball",
  "Under Armour Soccer Ball"
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
