import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import CheckoutSteps from "./checkoutSteps";

const CheckoutConfirmation = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        _id: 1,
        name: "Black Top",
        selectedQuantity: 2,
        price: 30,
        numberInStock: 3,
        category: { _id: "123", name: "Women fashion" }
      },
      {
        _id: 2,
        name: "White shorts",
        selectedQuantity: 3,
        price: 45,
        numberInStock: 2,
        category: { _id: "123", name: "Women fashion" }
      }
    ]);
  }, []);

  const handleConfirmOrder = () => {
    console.log("confirm order");
    // call server and update orders
  };

  console.log(props.location.state.address, props.location.state.paymentMethod);

  const productTemplate = ({
    name,
    selectedQuantity,
    numberInStock,
    category,
    price,
    _id
  }) => {
    const quantities = [];

    for (let i = 1; i <= numberInStock; i++) {
      quantities.push({ label: `${i}`, value: i });
    }
    return (
      <div className="p-col-12" key={_id}>
        <div className="p-grid p-justify-center">
          <img
            src={
              category
                ? `http://localhost:3090/images/products/${category.name}/${name}.jpg`
                : null
            }
            alt={name}
            className="p-col-4"
          />
          <div className="p-grid p-dir-col p-col-6">
            <div className="p-col" style={{ fontWeight: "bold" }}>
              {price}
            </div>
            <div className="p-col">
              <Dropdown
                value={selectedQuantity}
                options={quantities}
                placeholder={"1"}
                onChange={() => console.log("update cart?")}
              ></Dropdown>
            </div>
            <div className="p-col">
              <Button
                label="Remove"
                onClick={() => console.log("remove from cart")}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalAmount = () => {
    let amount = 0;
    products.forEach(p => (amount = amount + parseInt(p.price)));
    return amount;
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12">
        <CheckoutSteps activeIndex={2} />
        <div className="p-grid p-justify-center p-col-12">Order recap</div>
      </div>
      <div className="p-col-12 p-md-8 p-lg-7">
        <Card className="p-col-12">
          <ul className="p-col-12">{products.map(p => productTemplate(p))}</ul>
        </Card>
      </div>
      <div className="p-grid p-justify-center p-align-center p-col-12 p-md-4 p-lg-3">
        <Card className="p-grid p-justify-center p-col-12">
          <div className="p-col-12" style={{ fontWeight: "bold" }}>
            {`Subtotal (${products.length} items): €${totalAmount()}`}
          </div>
          <div className="p-col-12">
            <Button label="Confirm order" onClick={handleConfirmOrder}></Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
