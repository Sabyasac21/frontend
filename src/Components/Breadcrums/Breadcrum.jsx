import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assests/breadcrum_arrow.png";
import { Link } from "react-router-dom";

const Breadcrum = (props) => {
  const { product } = props;

  if (!product) {
    return null;
  }

  const categoryPath = product.category === "kid" ? "/kids" : `/${product.category}`;

  return (
    <div className="breadcrum">
      <Link className="breadcrum-link" to="/">Home</Link>
      <img src={arrow_icon} alt="" />
      <Link className="breadcrum-link" to="/">Shop</Link>
      <img src={arrow_icon} alt="" />
      <Link className="breadcrum-link" to={categoryPath}>{product.category}</Link>
      <img src={arrow_icon} alt="" />
      <span className="breadcrum-current">{product.name}</span>
    </div>
  );
};

export default Breadcrum;
