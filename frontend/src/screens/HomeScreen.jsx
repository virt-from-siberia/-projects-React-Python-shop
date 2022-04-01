import React from "react";
import { Row, Col } from "react-bootstrap";
import { Product } from "../components/Product";

import products from "../products";

export function HomeScreen() {
  return (
    <div>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={product._id}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
