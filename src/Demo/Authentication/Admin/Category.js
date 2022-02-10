import React from "react";
import { Card, Col, Image } from "react-bootstrap";

const Category = ({ id }) => {
  return (
      <img
        src={`http://localhost:5000/categories/${id}`}
        alt="contact-img"
        title="contact-img"
        className="rounded mr-3"
        height="48"
      />

  );
};

export default Category;