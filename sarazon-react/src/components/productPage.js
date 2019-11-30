import React, { useState, useEffect, useRef } from "react";
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Fieldset } from "primereact/fieldset";
import { Growl } from "primereact/growl";
import { getProduct } from "../services/productService";
import { updateCart, getCartProducts } from "../services/cartService";
import auth from "../services/authService";
import { showMessage } from "./../utils";

const ProductPage = props => {
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");

  const growl = useRef();

  useEffect(() => {
    loadUser();
    loadProduct();
  }, []);

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadProduct = async () => {
    const { id } = props.match.params;
    const { data } = await getProduct(id);
    setProduct(data);
  };

  const loadCart = async () => {
    const { data: products } = await getCartProducts();
    setCart(products);
  };

  const loadUser = () => {
    const user = auth.getCurrentUser();
    setUser(user);
  };

  const { category, name, description, price, numberInStock } = product;
  const quantities = [];

  for (let i = 1; i <= numberInStock; i++) {
    quantities.push({ label: `${i}`, value: i });
  }

  const handleAddToCart = async () => {
    if (!user) {
      props.history.push("/login");
      return;
    }
    let allCartProducts = [{ ...product, selectedQuantity }, ...cart];
    const alreadyPresentProduct = cart.filter(p => p._id === product._id)[0];
    if (alreadyPresentProduct) {
      allCartProducts = cart.map(p => {
        if (p._id === product._id) {
          p.selectedQuantity = selectedQuantity;
        }
        return p;
      });
    }
    const { status } = await updateCart(allCartProducts);
    if (status === 200) {
      showMessage(growl, "success", "Product added to cart!");
      setCart(allCartProducts);
    }
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
          <div className="p-col bold">{price}</div>
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
