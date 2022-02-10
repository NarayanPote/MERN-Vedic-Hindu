import React from "react";
import { Card, Col, Image } from "react-bootstrap";

const Photo = ({ id }) => {
  return (
      <img
        src={`http://localhost:5000/photos/${id}`}
        alt="contact-img"
        title="contact-img"
        className="rounded mr-3"
        height="48"
      />

  );
};

export default Photo;
