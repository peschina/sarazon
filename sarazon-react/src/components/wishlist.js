import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Growl } from "primereact/growl";
import { getWishlist, updateWishlist } from "./../services/wishlistService";
import { getCartProducts, updateCart } from "./../services/cartService";
import { showMessage } from "./../utils";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const growl = useRef();

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await getWishlist();
      setProducts(data);
    };
    const loadCart = async () => {
      const { data } = await getCartProducts();
      setCart(data);
    };
    loadProducts();
    loadCart();
  }, []);

  const handleRemove = async id => {
    const updatedProducts = products.filter(p => p._id !== id);
    const { status } = await updateWishlist(updatedProducts);
    if (status === 200) {
      setProducts(updatedProducts);
      showMessage(growl, "success", "Product removed from wishlist!");
    }
  };

  const handleMove = async id => {
    const product = products.filter(p => p._id === id)[0];
    const alreadyPresentProduct = cart.filter(p => p._id === id)[0];
    if (alreadyPresentProduct) {
      showMessage(growl, "warn", "Product is already present in cart");
      return;
    }
    const allCartProducts = [{ ...product, selectedQuantity: 1 }, ...cart];
    const { status } = await updateCart(allCartProducts);
    if (status === 200) {
      showMessage(growl, "success", "Product added to cart!");
      setCart(allCartProducts);
    }
    handleRemove(id);
  };

  const itemTemplate = ({ _id, name, category, price }) => {
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
      <Growl ref={el => (growl.current = el)} />
      <Card className="p-col-12 p-md-10 p-lg-8" style={{ boxShadow: "unset" }}>
        <div className="p-grid p-col-12">
          <div className="p-col-11 bold" style={{ textAlign: "left" }}>
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
