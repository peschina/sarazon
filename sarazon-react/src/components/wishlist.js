import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { cartProducts } from "./../fakeProductService";

const Wishlist = () => {
  const [products, setProducts] = useState(cartProducts);

  const handleRemove = id => {
    const updatedProducts = products.filter(p => p._id !== id);
    setProducts(updatedProducts);
    // save changes in db
  };

  const handleMove = id => {
    const updatedProducts = products.filter(p => p._id !== id);
    setProducts(updatedProducts);
    // save changes in db
  };

  const itemTemplate = ({ _id, name, image, price, numberInStock }) => {
    return (
      <Card className="p-col-12" key={_id}>
        <div className="p-grid p-align-center">
          <Link to={`/product/${_id}`} className="p-col-4">
            <img src={image} alt={name} />
          </Link>
          <div className="p-grid p-dir-col p-col-6">
            <Link
              to={`/product/${_id}`}
              className="p-col"
              style={{ fontWeight: "bold" }}
            >
              {name}
            </Link>
            <div className="p-col"></div>
            <div className="p-grid p-col">
              <div className="p-col p-col-md-3 p-col-lg-2">
                <Button
                  label="Remove"
                  icon="pi pi-trash"
                  onClick={() => handleRemove(_id)}
                ></Button>
              </div>
              <div className="p-col p-col-md-4">
                <Button
                  label="Move to cart"
                  onClick={() => handleMove(_id)}
                ></Button>
              </div>
            </div>
          </div>
          <div className="p-col-2" style={{ textAlign: "right" }}>
            €{price}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-grid p-justify-center">
      <Card className="p-col-12 p-md-10 p-lg-8" style={{ boxShadow: "unset" }}>
        <div className="p-grid p-col-12">
          <div
            className="p-col-11"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            {"Wishlist"}
          </div>
          <div className="p-col-1" style={{ textAlign: "right" }}>
            {"Price"}
          </div>
        </div>
        {products.map(p => itemTemplate(p))}
      </Card>
    </div>
  );
};

export default Wishlist;
