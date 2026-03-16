import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assests/logo.png";
import cart_icon from "../Assests/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <header className="nav-shell">
      <div className="nav-announcement">
        Curated essentials for every day wear. Free shipping on new season drops.
      </div>
      <div className="navbar section-shell">
        <Link className="nav-logo" to="/">
          <img src={logo} alt="Shopper logo" />
          <div>
            <p>SHOPPER</p>
            <span>Modern everyday commerce</span>
          </div>
        </Link>
        <img
          style={{ height: "30px" }}
          className="nav-dropdown"
          onClick={dropdown_toggle}
          src="https://tse1.mm.bing.net/th?id=OIP.edZDCtJ-F1YiAeE0fflCGQHaHa&pid=Api&P=0&h=180"
          alt="Open navigation"
        />
        <ul ref={menuRef} className="nav-menu">
          <li onClick={() => setMenu("shop")}>
            <Link to="/">Shop</Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li onClick={() => setMenu("men")}>
            <Link to="/men">Men</Link>
            {menu === "men" ? <hr /> : <></>}
          </li>
          <li onClick={() => setMenu("women")}>
            <Link to="/women">Women</Link>
            {menu === "women" ? <hr /> : <></>}
          </li>
          <li onClick={() => setMenu("kids")}>
            <Link to="/kids">Kids</Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </ul>

        <div className="nav-login-cart">
          <div className="nav-service-copy">
            <span>Ships worldwide</span>
            <strong>New collections weekly</strong>
          </div>
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}

          <Link className="nav-cart-icon" to="/cart">
            <img src={cart_icon} alt="Cart" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </Link>
        </div>
      </div>
    </header>
  );
};
