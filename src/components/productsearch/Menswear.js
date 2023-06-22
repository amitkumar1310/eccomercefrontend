import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

function Menswear() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/product/menswear`;
        if (minPrice && maxPrice) {
          url += `?min_price=${minPrice}&max_price=${maxPrice}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [minPrice, maxPrice]);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    // Perform validation or other checks if needed
    // Update the state with the entered price range
    setMinPrice(e.target.minPrice.value);
    setMaxPrice(e.target.maxPrice.value);
  };

  return (
    <div>
       <Link to="/" className="btn btn-dark my-3">
                Go Back
              </Link>
      <Row>
      
          <Col>
            <Col>
            <Card  style={{backgroundColor:"wheat"}}>
              <Row>
                <strong style={{ color: 'green' }}>
                  <h2>Products Based on Your Choice</h2>
                </strong>
              </Row>
              <Row>
                <strong style={{ color: 'black' }}>
                  <h2>Category:</h2>
                </strong>
              </Row>
              <Row>
                <strong style={{ color: 'black' }}>
                  <h2>Menswear</h2>
                </strong>
              </Row>
             
              </Card>
            </Col>

            <Col>
              <Form onSubmit={handlePriceFilter}>
                <Row>
                  <Col md={4}>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Min Price"
                      name="minPrice"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Max Price"
                      name="maxPrice"
                    />
                  </Col>
                  <Col md={4}>
                    <button type="submit" className="btn btn-primary">
                      Filter
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Col>
        
      </Row>

      <Row>
            
        <Col>
          <Carousel pause="hover" className="caras">
            {products.map((product) => (
              <Carousel.Item key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <Image
                    className="img-fluid"
                    style={{ height: '300px' }}
                    src={product.image}
                    alt={product.name}
                    fluid
                  />

                  <Carousel.Caption className="carousel-caption">
                    <h4 className="text">
                      {product.name} (₹{product.price})
                    </h4>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        
      </Row>
    </div>
  );
}

export default Menswear;
