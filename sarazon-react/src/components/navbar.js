import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const Navbar = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", setIsMobile(window.innerWidth < 425));
    return window.removeEventListener(
      "resize",
      setIsMobile(window.innerWidth < 425)
    );
  }, []);

  const items = [
    {
      label: "Home",
      url: "/"
    },
    {
      label: "Shop",
      url: "/products"
    },
    {
      label: "Cart",
      url: "/cart",
      icon: "pi pi-shopping-cart"
    },
    {
      label: user ? "Personal area" : "Login",
      url: user ? null : "/login",
      items: user
        ? [
            {
              label: "Profile",
              url: "/profile"
            },
            {
              label: "Orders",
              url: "/orders"
            },
            {
              label: "Wishlist",
              url: "/wishlist"
            },
            {
              label: "Logout",
              icon: "pi pi-power-off",
              url: "/logout"
            }
          ]
        : null
    },
    {
      label: "About"
    },
    {
      label: "Contacts",
      url: "/contact"
    }
  ];

  const logo = [
    {
      label: "Sarazon"
    }
  ];

  return (
    <div style={{ marginBottom: "1em" }}>
      {isMobile ? (
        <div className="p-grid" style={{ marginBottom: "1em" }}>
          <div className="p-col-12">
            <Menu ref={el => (menuRef = el)} model={items} popup={true} />
            <div className="p-grid p-justify-between">
              <Button
                type="button"
                icon="pi pi-bars"
                className="p-col-5"
                onClick={e => menuRef.toggle(e)}
              ></Button>
              <Link to="/" className="p-col-7">
                Sarazon
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-grid p-justify-between"
          style={{ marginBottom: "1em" }}
        >
          <Menubar
            model={logo}
            className="p-col-12 ui-menubar-custom"
            style={{ fontSize: "20px" }}
          ></Menubar>
          <Menubar
            model={items}
            className="p-col-12"
            style={{ textAlign: "center" }}
          ></Menubar>
        </div>
      )}
    </div>
  );
};

export default withRouter(Navbar);
