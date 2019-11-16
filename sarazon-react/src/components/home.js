import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { getCategories } from "./../services/categoryService";
import { getProductsByCategory } from "./../services/productService";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [latestElectronics, setLatestElectronics] = useState([]);
  const [latestWomenFashion, setLatestWomenFashion] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const toBeDisplayed = [
      {
        name: "Books",
        setter: setLatestBooks
      },
      {
        name: "Electronics",
        setter: setLatestElectronics
      },
      {
        name: "Women Fashion",
        setter: setLatestWomenFashion
      }
    ];
    toBeDisplayed.map(i => {
      const category = categories.filter(c => c.name === i.name)[0];
      if (category) loadProducts(category, i.setter);
    });
  }, [categories]);

  const loadProducts = async (booksCategory, callback) => {
    const { data } = await getProductsByCategory(booksCategory);
    callback(data);
  };

  const loadCategories = async () => {
    const { data: categories } = await getCategories();
    setCategories(categories);
  };

  const responsiveSettings = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1
    }
  ];

  const categoryTemplate = ({ _id, name }) => (
    <Link
      to={{ pathname: "/products", state: { category: [name] } }}
      className="p-grid p-nogutter"
    >
      <div className="p-col-12">
        <div style={{ fontWeight: "bold", textAlign: "center" }}>{name}</div>
      </div>
      <div className="p-col-12" style={{ textAlign: "center" }}>
        <img
          src={`http://localhost:3090/images/${name}.jpg`}
          alt={name}
          style={{ maxWidth: "100%", height: "200px" }}
        />
      </div>
    </Link>
  );

  const productTemplate = ({ _id, name, image, price }) => (
    <Link to={`/product/${_id}`} className="p-grid p-nogutter">
      <div className="p-col-12">
        <div style={{ fontWeight: "bold", textAlign: "center" }}>{name}</div>
      </div>
      <div className="p-col-12">
        <img
          src={image}
          alt={name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="p-col-12">{price}</div>
    </Link>
  );

  const customHeader = text => <h2 style={{ textAlign: "center" }}>{text}</h2>;

  const latestProductsCarousel = (products, categoryName) => {
    if (!products || products.length === 0) return;
    return (
      <Card className="p-col-12" style={{ marginTop: "1.5em" }}>
        <Carousel
          value={products}
          itemTemplate={productTemplate}
          responsiveOptions={responsiveSettings}
          numVisible={3}
          numScroll={3}
          header={customHeader(`Latest products in ${categoryName}`)}
        ></Carousel>
      </Card>
    );
  };
  return (
    <>
      <Card>
        <Carousel
          value={categories}
          itemTemplate={categoryTemplate}
          responsiveOptions={responsiveSettings}
          numVisible={3}
          numScroll={3}
          header={customHeader("Explore by category")}
          circular={true}
          autoplayInterval={3000}
        ></Carousel>
      </Card>
      {latestProductsCarousel(latestBooks, "Books")}
      {latestProductsCarousel(latestElectronics, "Electronics")}
      {latestProductsCarousel(latestWomenFashion, "Women Fashion")}
    </>
  );
};

export default Home;
