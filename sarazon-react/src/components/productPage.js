import React, { useState, useEffect, useRef } from "react";
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Fieldset } from "primereact/fieldset";
import { Growl } from "primereact/growl";
import { getProduct } from "../services/productService";
import { addProductToCart } from "../services/cartService";
import { showMessage } from "./../utils";

const ProductPage = props => {
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const growl = useRef();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const { id } = props.match.params;
    const { data } = await getProduct(id);
    setProduct(data);
  };

  const { _id, category, name, description, price, numberInStock } = product;
  const quantities = [];

  for (let i = 1; i <= numberInStock; i++) {
    quantities.push({ label: `${i}`, value: i });
  }

  const handleAddToCart = async () => {
    const { data } = await addProductToCart({
      _id: _id,
      selectedQuantity: selectedQuantity
    });
    if (data === "Update successfull")
      showMessage(growl, "success", "Product added to cart!");
  };

  const renderCard = (content, title) => (
    <div className="p-col-12 p-md-6">
      <Card
        title={title}
        className="p-grid p-justify-center"
        style={{ boxShadow: "unset" }}
      >
        {content}
      </Card>
    </div>
  );

  const fieldsetClass = "p-col-12 p-md-offset-1 p-md-10";
  const renderFieldset = legend => {
    return (
      <Fieldset legend={legend} toggleable={true}>
        <div className={fieldsetClass}>{description}</div>
      </Fieldset>
    );
  };

  return (
    <div className="p-grid p-justify-center" style={{ padding: "1em" }}>
      <Growl ref={el => (growl.current = el)} />
      {renderCard(
        <img
          src={
            category
              ? `http://localhost:3090/images/products/${category.name}/${name}.jpg`
              : null
          }
          alt={name}
          style={{ maxWidth: "100%", height: "200px" }}
        />
      )}
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
      <div className={fieldsetClass}>
        {renderFieldset("Product description")}
        {renderFieldset("Delivery options and conditions")}
      </div>
    </div>
  );
};

export default ProductPage;
