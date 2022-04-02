import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import axios from 'axios'

import {Product} from "../components/Product";


export function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const {data} = await axios.get('/api/products/').then()
            console.log('data', data)
            setProducts(data)
        }
        fetchProducts()

    }, [])


    return (
        <div>
            <h1>Latest products</h1>
            <Row>
                {products.length > 0 && products.map((product) => (
                    <Col
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        key={product._id}
                    >
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
