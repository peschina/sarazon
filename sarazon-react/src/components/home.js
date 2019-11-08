import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { getCategories } from "./../services/categoryService";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };
    loadData();
  }, []);

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

  const itemTemplate = ({ _id, name, image }) => (
    <Link
      to={{ pathname: "/products", state: { category: [name] } }}
      className="p-grid p-nogutter"
    >
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
    </Link>
  );

  const customHeader = (
    <h2 style={{ textAlign: "center" }}>Explore by category</h2>
  );

  return (
    <Carousel
      value={categories}
      itemTemplate={itemTemplate}
      numVisible={3}
      numScroll={1}
      responsive={responsiveSettings}
      header={customHeader}
      circular={true}
      autoplayInterval={3000}
    ></Carousel>
  );
};

export default Home;
