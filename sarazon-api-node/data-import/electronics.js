const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "Airpods",
  "Amazon Echo Dot Speaker",
  "Apple HomePod Speaker",
  "Black Iphone 7",
  "Cordless Mouse",
  "Google Smart Speaker",
  "Headphones",
  "iMac",
  "Ipad & Apple Pencil",
  "MacBook Pro",
  "Magic Keyboard",
  "Magic Mouse",
  "Silver Iphone X",
  "White Corded Computer Keyboard",
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