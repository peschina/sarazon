import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { cartProducts } from "./../fakeProductService";

const Cart = () => {
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

  const handleProductQuantity = (value, id) => {
    const updatedProducts = products.filter(p => {
      if (p._id === id) p.selectedQuantity = value;
      return p;
    });
    setProducts(updatedProducts);
    // save changes in db
  };

  const itemTemplate = ({
    _id,
    name,
    image,
    price,
    numberInStock,
    selectedQuantity
  }) => {
    const quantities = [];
    for (let i = 1; i <= numberInStock; i++) {
      quantities.push({ label: `${i}`, value: i });
    }

    return (
      <Card className="p-col-12" key={_id}>
        <div className="p-grid p-align-center">
          <Link to={`/product/${_id}`} className="p-col-4">
            <img
              src={image}
              alt={name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>
          <div className="p-grid p-dir-col p-col-6">
            <Link
              to={`/product/${_id}`}
              className="p-col"
              style={{ fontWeight: "bold" }}
            >
              {name}
            </Link>
            <div className="p-col">
              <Dropdown
                value={selectedQuantity}
                options={quantities}
                placeholder={"1"}
                onChange={e => handleProductQuantity(e.value, _id)}
              ></Dropdown>
            </div>
            <div className="p-grid p-col">
              <div className="p-col-4 p-col-md-3 p-col-lg-2">
                <Button
                  label="Remove"
                  icon="pi pi-trash"
                  onClick={() => handleRemove(_id)}
                ></Button>
              </div>
              <div className="p-col p-col-md-4">
                <Button
                  label="Move to wishlist"
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

  const totalAmount = () => {
    let amount = 0;
    cartProducts.forEach(p => (amount = amount + parseInt(p.price)));
    return amount;
  };

  const footer = (
    <div className="p-grid p-col-12">
      <div className="p-col-11" style={{ textAlign: "left" }}>
        {"Total"}
      </div>
      <div
        className="p-col-1"
        style={{ textAlign: "right", fontWeight: "bold" }}
      >
        €{totalAmount()}
      </div>
    </div>
  );

  return (
    <div className="p-grid p-justify-center">
      <Card
        footer={footer}
        className="p-col-12 p-md-10 p-lg-8"
        style={{ boxShadow: "unset" }}
      >
        <div className="p-grid p-col-12">
          <div
            className="p-col-11"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            {"Cart"}
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

export default Cart;
