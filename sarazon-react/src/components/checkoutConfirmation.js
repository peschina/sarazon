import React, { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Growl } from "primereact/growl";
import CheckoutSteps from "./checkoutSteps";
import { getCartProducts, updateCart } from "./../services/cartService";
import { showMessage } from "./../utils";
import { addOrder } from "../services/orderService";

const CheckoutConfirmation = props => {
  const [products, setProducts] = useState([]);

  const growl = useRef();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await getCartProducts();
    setProducts(data);
  };

  const handleConfirmOrder = async () => {
    const productsIds = products.map(p => p._id);
    const { status } = await addOrder({
      products: productsIds,
      deliveryAddress: props.location.state.address
    });
    if (status === 200)
      showMessage(growl, "success", "Your order has been accepted");
  };

  const handleProductQuantity = async (value, id) => {
    const updatedProducts = products.filter(p => {
      if (p._id === id) p.selectedQuantity = value;
      return p;
    });
    const { status } = await updateCart(updatedProducts);
    if (status === 200) {
      setProducts(updatedProducts);
      showMessage(growl, "success", "Cart updated!");
    }
  };

  const handleRemove = async id => {
    const updatedProducts = products.filter(p => p._id === id);
    const { status } = await updateCart(updatedProducts);
    if (status === 200) {
      showMessage(growl, "success", "Product removed from cart");
      setProducts(updatedProducts);
    }
  };

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
          <div className="p-col-5">
            <img
              src={
                category
                  ? `http://localhost:3090/images/products/${category.name}/${name}.jpg`
                  : null
              }
              alt={name}
              style={{ marginRight: "2em" }}
            />
          </div>
          <div className="p-grid p-col-6">
            <div className="p-col-12 bold">{name}</div>
            <div className="p-col-12 bold">€{price}</div>
            <div className="p-col">
              <Dropdown
                value={selectedQuantity}
                options={quantities}
                placeholder={"1"}
                onChange={e => handleProductQuantity(e.value, _id)}
              ></Dropdown>
            </div>
            <div className="p-col-12">
              <Button label="Remove" onClick={() => handleRemove(_id)}></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalAmount = () => {
    let amount = 0;
    products.forEach(p => (amount = amount + p.price));
    return amount;
  };

  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
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
          <div className="p-col-12 bold">
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
