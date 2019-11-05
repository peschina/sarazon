import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { orders as allOrders } from "../fakeProductService";

const Orders = () => {
  const [orders, setOrders] = useState(allOrders);

  const handleAddToCart = () => console.log('add to cart');

  const productTemplate = ({ _id, name, image, price }) => (
    <Card className="p-col-12" style={{ boxShadow: "unset" }} key={_id}>
      <div className="p-grid p-col-12">
        <Link to={`/product/${_id}`} className="p-col-4 p-md-5 p-lg-5">
          <img
            src={image}
            alt={name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Link>
        <div className="p-grid p-dir-col p-col">
          <Link
            to={`/product/${_id}`}
            className="p-col"
            style={{ fontWeight: "bold" }}
          >
            {name}
          </Link>
          <div className="p-col">{price}</div>
		  <div className="p-col">
		  	<Button label="Buy again" onClick={handleAddToCart}></Button>
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
    billingAddress,
    totalAmount
  }) => {
    return (
      <Panel
        className="p-col-12"
        header={`${creationDate} / Order n. ${_id}`}
        style={{ marginBottom: "2em" }}
        key={_id}
      >
			<div className='p-grid p-justify-center p-align-center'>
          <div className="p-grid p-justify-center p-col-12 p-md-8 p-lg-8">
            {products.map(p => productTemplate(p))}
          </div>
			<div className="p-grid p-dir-col p-col" >
		  	<div className="p-col">
			  <label className="p-col-12">Delivered: 
				<div className="p-col-12">{creationDate}</div>
			  </label>
       		</div>
		  	<div className="p-col">
				<label className="p-col-12">Total: 
				<div className="p-col-12">{`€${totalAmount}`}</div>
			  </label>
       		</div>
		  	<div className="p-col">
			  <label className="p-col-12">
				Delivered to: 
				<div className='p-col-12'>
				  {`${deliveryAddress}`}
	        	</div>
	          </label>
       		</div>
	        </div>
        </div>
      </Panel>
    );
  };
  
  const customHeader = (_id, creationDate, totalAmount) => (
  	<div className='p-grid'>
	  <div style={{ alignText: 'left' }}>
    	{`${creationDate} / Order n. ${_id}`}
	  </div>
	  <div style={{ alignText: 'right' }}>
    	{`Total: ${totalAmount}`}
	  </div>
	</div>
  );

  return (
    <div className="p-grid p-justify-center">
      <Card className="p-col-12 p-md-10 p-lg-8" style={{ boxShadow: "unset" }}>
        <div className="p-grid p-col-12">
          <div
            className="p-col-11"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            {"My orders"}
          </div>
        </div>
        {orders.map(p => itemTemplate(p))}
      </Card>
    </div>
  );
};

export default Orders;
