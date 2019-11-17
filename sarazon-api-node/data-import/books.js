const { getRandomDate, getRandomNumber, getRandomPrice } = require("./utils");

const names = [
  "100 Essay That Will Change The Way You Think",
  "Classics Collection",
  "De Antwoorden Op De Grote Vragen",
  "Happy",
  "Holy Bible",
  "Just Shut Up And Do It!",
  "Les Nuits D'Young",
  "Milk And Honey",
  "The Gospels Collection",
  "Your Soul Is A River",
  "Front-end Development Collection"
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
