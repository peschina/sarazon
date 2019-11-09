import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const Navbar = ({ history, user }) => {
  const [isMobile, setIsMobile] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", setIsMobile(window.innerWidth < 425));
    return window.removeEventListener(
      "resize",
      setIsMobile(window.innerWidth < 425)
    );
  }, []);

  const navigateToPage = path => history.push(path);

  const items = [
    {
      label: "Shop",
      command: () => navigateToPage("/products")
    },
    {
      label: "Cart",
      command: () => navigateToPage("/cart"),
      icon: "pi pi-shopping-cart"
    },
    {
      label: user ? "Personal area" : "Login",
      command: user ? null : () => navigateToPage("/login"),
      items: user
        ? [
            {
              label: "Profile",
              command: () => navigateToPage("/profile")
            },
            {
              label: "Orders",
              command: () => navigateToPage("/orders")
            },
            {
              label: "Wishlist",
              command: () => navigateToPage("/wishlist")
            },
            {
              label: "Logout",
              icon: "pi pi-power-off",
              command: () => navigateToPage("/logout")
            }
          ]
        : null
    },
    {
      label: "About us"
    },
    {
      label: "Contacts",
      command: () => navigateToPage("/contact")
    }
  ];

  return (
    <div style={{ marginBottom: "1em" }}>
      {isMobile ? (
        <div
          className="p-grid p-justify-between"
          style={{ marginBottom: "1em" }}
        >
          <div className="p-col-2">
            <Menu ref={el => (menuRef = el)} model={items} popup={true} />
            <Button
              type="button"
              icon="pi pi-bars"
              onClick={e => menuRef.toggle(e)}
            ></Button>
          </div>
          <div className="p-col-5">
            <Link to="/">Logo</Link>
          </div>
        </div>
      ) : (
        <div
          className="p-grid p-justify-between"
          style={{ marginBottom: "1em" }}
        >
          <div className="p-col">
            <Menubar model={items}>
              <Link to="/">Sarazon</Link>
            </Menubar>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Navbar);
