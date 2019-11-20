const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Alphabet Cube Toy Set",
  "Barbie & Ken",
  "Blue Elephant Plush",
  "Colored Pencils",
  "Pink Dinosaur",
  "Plush Bear",
  "Robot Toy",
  "Star Wars Stormtroopers",
  "White Bear",
  "Yellow Car Toy"
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
