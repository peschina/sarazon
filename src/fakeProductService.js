import yarn from "./img/yarn.jpg";

export const allProducts = [
  {
    _id: 1,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
    numberInStock: 3,
    insertionDate: new Date("December 17, 1995 03:24:00"),
    category: "Women fashion"
  },
  {
    _id: 2,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
    numberInStock: 2,
    insertionDate: new Date("December 27, 1995 03:24:00"),
    category: "Women fashion"
  },
  {
    _id: 3,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
    numberInStock: 25,
    insertionDate: new Date("December 17, 1955 03:24:00"),
    category: "Books"
  },
  {
    _id: 4,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
    numberInStock: 30,
    insertionDate: new Date("December 17, 1985 03:24:00"),
    category: "Books"
  },
  {
    _id: 5,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
    numberInStock: 50,
    insertionDate: new Date("December 17, 1999 03:24:00"),
    category: "Home & Kitchen"
  },
  {
    _id: 6,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
    numberInStock: 10,
    insertionDate: new Date("December 14, 1956 03:24:00"),
    category: "Home & Kitchen"
  },
  {
    _id: 7,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
    numberInStock: 3,
    category: "Women fashion"
  },
  {
    _id: 8,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
    numberInStock: 2,
    insertionDate: new Date("October 14, 1956 03:24:00"),
    category: "Women fashion"
  },
  {
    _id: 9,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
    numberInStock: 25,
    insertionDate: new Date("October 24, 1956 03:24:00"),
    category: "Books"
  },
  {
    _id: 10,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
    numberInStock: 30,
    insertionDate: new Date("July 14, 1956 03:24:00"),
    category: "Books"
  },
  {
    _id: 11,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
    numberInStock: 50,
    insertionDate: new Date("July 23, 1978 03:24:00"),
    category: "Home & Kitchen"
  },
  {
    _id: 12,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
    numberInStock: 10,
    insertionDate: new Date("July 23, 2011 03:24:00"),
    category: "Home & Kitchen"
  },
  {
    _id: 13,
    name: "Black Top",
    description: "nice black top",
    price: "€30",
    image: yarn,
    numberInStock: 3,
    insertionDate: new Date("July 23, 2014 03:24:00"),
    category: "Women fashion"
  },
  {
    _id: 14,
    name: "White shorts",
    description: "skinny White shorts",
    price: "€45",
    image: yarn,
    numberInStock: 2,
    insertionDate: new Date("July 23, 2014 03:34:00"),
    category: "Women fashion"
  },
  {
    _id: 15,
    name: "Harry Potter and the Goblet of Fire",
    description: "the illustrated edition",
    price: "€15",
    image: yarn,
    numberInStock: 25,
    insertionDate: new Date("July 22, 2014 03:24:00"),
    category: "Books"
  },
  {
    _id: 16,
    name: "The Hound of the Baskervilles",
    description: "by Sir Arthur Conan Doyle",
    price: "€7",
    image: yarn,
    numberInStock: 30,
    insertionDate: new Date("July 23, 2004 03:24:00"),
    category: "Books"
  },
  {
    _id: 17,
    name: "Shaker Bottle",
    description: "28-ounce, black",
    price: "€10",
    image: yarn,
    numberInStock: 50,
    insertionDate: new Date("June 23, 2004 03:24:00"),
    category: "Home & Kitchen"
  },
  {
    _id: 18,
    name: "Electric hot water kettle",
    description: "stainless steel",
    price: "€25",
    image: yarn,
    numberInStock: 10,
    insertionDate: new Date("July 25, 2004 03:24:00"),
    category: "Home & Kitchen"
  }
];

export const getProduct = id =>
  allProducts.filter(p => p._id === parseInt(id))[0];
