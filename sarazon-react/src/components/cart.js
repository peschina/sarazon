import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Growl } from "primereact/growl";
import { getSponsoredProducts } from "./../services/productService";
import { getCartProducts, updateCart } from "./../services/cartService";
import { getWishlist, updateWishlist } from "../services/wishlistService";
import { showMessage } from "./../utils";

const Cart = props => {
  const [products, setProducts] = useState([]);
  const [sponsored, setSponsored] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const growl = useRef();

  useEffect(() => {
    loadCartProducts();
    loadSponsoredProducts();
    loadWishlist();
  }, []);

  const loadSponsoredProducts = async () => {
    const { data: products } = await getSponsoredProducts();
    setSponsored(products);
  };

  const loadCartProducts = async () => {
    const { data } = await getCartProducts();
    setProducts(data);
  };

  const loadWishlist = async () => {
    const { data: products } = await getWishlist();
    setWishlist(products);
  };

  const handleRemove = async id => {
    const updatedProducts = products.filter(p => p._id !== id);
    setProducts(updatedProducts);
    const { status } = await updateCart(updatedProducts);
    if (status === 200)
      showMessage(growl, "success", "Product removed from cart!");
  };

  const handleMove = async id => {
    const product = products.filter(p => p._id === id)[0];

    const newWishlist = [...wishlist, product];
    const alreadyPresentProduct = wishlist.filter(p => p._id === id)[0];
    if (alreadyPresentProduct) {
      showMessage(growl, "success", "Product already saved in wishlist!");
      return;
    }
    const { status } = await updateWishlist(newWishlist);
    if (status === 200) {
      showMessage(growl, "success", "Product moved to wishlist!");
      handleRemove(id);
    }
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

  const handleCheckout = () => {
    props.history.push("/checkout-address");
  };

  const itemTemplate = ({
    _id,
    name,
    category,
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
              src={`http://localhost:3090/images/products/${category.name}/${name}.jpg`}
              alt={name}
            />
          </Link>
          <div className="p-grid p-dir-col p-col-6">
            <Link to={`/product/${_id}`} className="p-col bold">
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
              <div className="p-col-5 p-col-md-3 p-col-lg-2">
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

  const sponsoredTemplate = ({ _id, name, category, price }) => (
    <Card className="p-col-12 p-grid p-align-center" key={_id}>
      <div className="p-grid p-align-center">
        <Link to={`/product/${_id}`} className="p-col-5">
          <img
            src={`http://localhost:3090/images/products/${category.name}/${name}.jpg`}
            alt={name}
          />
        </Link>
        <div className="p-grid p-col-7">
          <Link to={`/product/${_id}`} className="p-col bold">
            {name}
          </Link>
          <div className="p-col-12">€{price}</div>
        </div>
      </div>
    </Card>
  );

  const totalAmount = () => {
    let amount = 0;
    products.forEach(p => (amount = amount + p.price));
    return amount;
  };

  const footer = (
    <div className="p-grid p-col-12">
      <div className="p-col-11" style={{ textAlign: "left" }}>
        {"Total"}
      </div>
      <div className="p-col-1 bold" style={{ textAlign: "right" }}>
        €{totalAmount()}
      </div>
    </div>
  );

  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
      <div className="p-grid p-justify-center p-col-12 p-md-8 p-lg-7">
        <Card
          footer={products.length === 0 ? null : footer}
          className="p-col-12"
          style={{ boxShadow: "unset" }}
        >
          {products.length === 0 ? (
            <div>
              Your Shopping Cart is empty. Continue shopping{" "}
              <Link to={"/products"}>here</Link>
            </div>
          ) : (
            <div>
              <div className="p-grid p-col-12" style={{ padding: "2em" }}>
                <div
                  className="p-col-11 bold"
                  style={{
                    textAlign: "left",
                    fontSize: "20px"
                  }}
                >
                  {"Cart"}
                </div>
                <div className="p-col-1" style={{ textAlign: "right" }}>
                  {"Price"}
                </div>
              </div>
              {products.map(p => itemTemplate(p))}
            </div>
          )}
        </Card>
      </div>
      <div className="p-grid p-justify-center p-col-12 p-md-4 p-lg-3">
        <Card className="p-col-12" style={{ boxShadow: "unset" }}>
          <div className="p-col"></div>
          <Card className="p-grid p-justify-center p-col-12">
            <div className="p-col-12 bold">
              {`Subtotal (${products.length} items): €${totalAmount()}`}
            </div>
            <div className="p-col-12">
              <Button
                disabled={products.length === 0}
                label="Proceed to checkout"
                onClick={handleCheckout}
              ></Button>
            </div>
          </Card>
          <div className="p-col"></div>
          <Card className="p-col-12" style={{ boxShadow: "unset" }}>
            Sponsored for you
          </Card>
          {sponsored.map(p => sponsoredTemplate(p))}
        </Card>
      </div>
    </div>
  );
};

export default Cart;
