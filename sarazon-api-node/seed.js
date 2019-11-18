const { Category } = require("./models/category");
const { Product } = require("./models/product");
const mongoose = require("mongoose");
const beautyProducts = require("./data-import/beauty");
const books = require("./data-import/books");
const electronicsProducts = require("./data-import/electronics");

const data = [
  {
    name: "Beauty & Personal Care",
    products: beautyProducts
  },
  {
    name: "Books",
    products: books
  },
  {
    name: "Electronics",
    products: electronicsProducts
  },
  {
    name: "Home & Kitchen",
    products: []
  },
  {
    name: "Women Fashion",
    products: []
  },
  {
    name: "Toys & Games",
    products: []
  },
  {
    name: "Music",
    products: []
  }
];

async function seed() {
  await mongoose.connect("mongodb://localhost/sarazon");

  await Category.deleteMany({});
  await Product.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({
      name: category.name
    }).save();
    const products = category.products.map(product => ({
      ...product,
      category: { _id: categoryId, name: category.name }
    }));
    await Product.insertMany(products);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
