import yarn from "./img/yarn.jpg";

export const allProducts = [
  {
    _id: 1,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
	numberInStock: 3,
    category: "Women fashion"
  },
  {
    _id: 2,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
	numberInStock: 2,
    category: "Women fashion"
  },
  {
    _id: 3,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
	numberInStock: 25,
    category: "Books"
  },
  {
    _id: 4,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
	numberInStock: 30,
    category: "Books"
  },
  {
    _id: 5,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
	numberInStock: 50,
    category: "Home & Kitchen"
  },
  {
    _id: 6,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
	numberInStock: 10,
    category: "Home & Kitchen"
  },
  {
    _id: 1,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
	numberInStock: 3,
    category: "Women fashion"
  },
  {
    _id: 2,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
	numberInStock: 2,
    category: "Women fashion"
  },
  {
    _id: 3,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
	numberInStock: 25,
    category: "Books"
  },
  {
    _id: 4,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
	numberInStock: 30,
    category: "Books"
  },
  {
    _id: 5,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
	numberInStock: 50,
    category: "Home & Kitchen"
  },
  {
    _id: 6,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
	numberInStock: 10,
    category: "Home & Kitchen"
  },
  {
    _id: 1,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
	numberInStock: 3,
    category: "Women fashion"
  },
  {
    _id: 2,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
	numberInStock: 2,
    category: "Women fashion"
  },
  {
    _id: 3,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
	numberInStock: 25,
    category: "Books"
  },
  {
    _id: 4,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
	numberInStock: 30,
    category: "Books"
  },
  {
    _id: 5,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
	numberInStock: 50,
    category: "Home & Kitchen"
  },
  {
    _id: 6,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
	numberInStock: 10,
    category: "Home & Kitchen"
  }
];

export const getProduct = id =>
  allProducts.filter(p => p._id === parseInt(id))[0];
