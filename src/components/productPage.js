import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { getProduct } from "../fakeProductService";

const productPage = props => {
  // const [stars, setStars] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const id = props.match.params.id;
  const { image, name, description, price } = getProduct(id);

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleAddToCart = () => {
    console.log("Add product to cart");
  };

  return (
    <div className="p-grid" style={{ padding: "1em" }}>
      <div className="p-col-5">
        <img src={image} alt={name} />
      </div>
      <div className="p-col-5">
        <div className="p-grid">
          <div className="p-col-12 p-card-title">
            {name}
            {/* <Rating
              value={stars}
              cancel={false}
              onChange={e => setStars(e.value)}
            /> */}
          </div>
          <hr></hr>
          <div className="p-col-12 ">{price}</div>
          <hr></hr>
          <div className="p-col-12">{description}</div>
        </div>
      </div>
      <div className="p-col-2">
        <div className="p-grid p-justify-center">
          <Card>
            <div className="p-col">
              <span>{price}</span>
            </div>
            <div className="p-col">
              <span>In stock?</span>
            </div>
            <div className="p-col">
              <span>Choose quantity</span>
              <Dropdown
                options={quantities}
                placeholder={1}
                onChange={e => setQuantity(e.value)}
              ></Dropdown>
            </div>
            <div className="p-col">
              <Button
                label="Add to cart"
                icon="pi pi-shopping-cart"
                onClick={handleAddToCart}
              ></Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default productPage;
