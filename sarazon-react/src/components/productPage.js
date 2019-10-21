import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Fieldset } from "primereact/fieldset";
import { getProduct } from "../fakeProductService";
import "../app.css";

const ProductPage = props => {
  const [stars, setStars] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const id = props.match.params.id;
  const { image, name, description, price, numberInStock } = getProduct(id);
  const quantities = [];

  for (let i = 1; i <= numberInStock; i++) {
    quantities.push({ label: `${i}`, value: i });
  }

  const handleAddToCart = () => console.log("Add product to cart");

  const renderCard = (content, title) => (
    <Card
      title={title}
      className="p-grid p-justify-center"
      style={{ boxShadow: "unset" }}
    >
      {content}
    </Card>
  );

  return (
    <div className="p-grid p-justify-center" style={{ padding: "1em" }}>
      <div className="p-col-12 p-md-6">
        {renderCard(<img src={image} alt={name} />)}
      </div>
      <div className="p-col-12 p-md-6">
        {renderCard(
          <>
            <div className="p-col">
              <Rating
                value={stars}
                cancel={false}
                onChange={e => setStars(e.value)}
              />
            </div>
            <hr></hr>
            <div className="p-col" style={{ fontWeight: "bold" }}>
              {price}
            </div>
            <div className="p-col">{numberInStock} in stock</div>
            <div className="p-col">
              <Dropdown
                value={selectedQuantity}
                options={quantities}
                placeholder={"1"}
                onChange={e => setSelectedQuantity(e.value)}
              ></Dropdown>
            </div>
            <div className="p-col">
              <Button
                label="Add to cart"
                icon="pi pi-shopping-cart"
                onClick={handleAddToCart}
              ></Button>
            </div>
          </>,
          name
        )}
      </div>
      <div className="p-col-12 p-md-offset-1 p-md-10">
        <Fieldset legend="Product description" toggleable={true}>
          <div className="p-col-12 p-md-offset-1 p-md-10">{description}</div>
        </Fieldset>
        <Fieldset legend="Delivery options and conditions" toggleable={true}>
          <div className="p-col-12 p-md-offset-1 p-md-10">{description}</div>
        </Fieldset>
      </div>
    </div>
  );
};

export default ProductPage;
