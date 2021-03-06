import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { Product } from "../components/Product";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

import { istProducts } from "../actions/productActions";

export function HomeScreen() {
  const productList = useSelector(
    (state) => state.productList
  );
  const { error, loading, products = [] } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(istProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.length > 0 &&
            products.map((product) => (
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
      )}
    </div>
  );
}
