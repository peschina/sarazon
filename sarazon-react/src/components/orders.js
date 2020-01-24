import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Growl } from "primereact/growl";
import { Button } from "primereact/button";
import { getOrders } from "./../services/orderService";
import { getCartProducts, updateCart } from "./../services/cartService";
import { showMessage } from "./../utils";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const growl = useRef();

  useEffect(() => {
    const loadData = async () => {
      const { data } = await getOrders();
      setOrders(data);
    };
    loadData();
  }, []);

  const handleAddToCart = async _id => {
    const { data: cartProducts } = await getCartProducts();
    const updatedCart = [...cartProducts, { _id, selectedQuantity: 1 }];
    const { status } = await updateCart(updatedCart);
    if (status === 200) showMessage(growl, "success", "Product added to cart!");
  };

  const productTemplate = ({ _id, name, category, price }) => (
    <Card className="p-col-12" style={{ boxShadow: "unset" }} key={_id}>
      <div className="p-grid p-col-12">
        <Link to={`/product/${_id}`} className="p-col-4 p-md-5 p-lg-5">
          <img
            src={`http://localhost:3090/images/products/${category.name}/${name}.jpg`}
            alt={name}
          />
        </Link>
        <div className="p-grid p-dir-col p-col">
          <Link to={`/product/${_id}`} className="p-col bold">
            {name}
          </Link>
          <div className="p-col">{price}</div>
          <div className="p-col">
            <Button
              label="Buy again"
              onClick={() => handleAddToCart(_id)}
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const itemTemplate = ({
    _id,
    creationDate,
    products,
    deliveryAddress,
    totalAmount
  }) => {
    return (
      <Panel
        className="p-col-12"
        header={`${creationDate} / Order n. ${_id}`}
        style={{ marginBottom: "2em" }}
        key={_id}
      >
        <div className="p-grid p-justify-center p-align-center">
          <div className="p-grid p-justify-center p-col-12 p-md-8 p-lg-8">
            {products.map(p => productTemplate(p))}
          </div>
          <div className="p-grid p-dir-col p-col">
            <div className="p-col">
              <label className="p-col-12">
                Delivered:
                <div className="p-col-12">{creationDate}</div>
              </label>
            </div>
            <div className="p-col">
              <label className="p-col-12">
                Total:
                <div className="p-col-12">{`€${totalAmount}`}</div>
              </label>
            </div>
            <div className="p-col">
              <label className="p-col-12">
                Delivered to:
                <div className="p-col-12">{`${deliveryAddress}`}</div>
              </label>
            </div>
          </div>
        </div>
      </Panel>
    );
  };

  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
      <Card className="p-col-12 p-md-10 p-lg-8" style={{ boxShadow: "unset" }}>
        <div className="p-grid p-col-12">
          <div className="p-col-11 bold" style={{ textAlign: "left" }}>
            {"My orders"}
          </div>
        </div>
        {orders.map(p => itemTemplate(p))}
      </Card>
    </div>
  );
};

export default Orders;
