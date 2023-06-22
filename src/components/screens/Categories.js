import React from 'react'
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
function Categories() {
  
  return (
    <div>
    <Row>
    <Col style={{color:"white"}}>
    <Link to="/sports" target="_self"  > <strong>
      <h4>sports</h4> 
      </strong></Link>
    </Col>
    <Col style={{color:"white"}}>

    <Link to="/menswear" target="_self"  > <strong>
      <h4>menswear</h4> 
      </strong></Link>
    </Col>
    <Col style={{color:"black"}}>
    <Link to="/womenswear" target="_self"  > <strong>
      <h4>womenswear</h4> 
      </strong></Link>
    </Col>
    <Col style={{color:"white"}}>
    <Link to="/electronics" target="_self"  > <strong>
      <h4>Electronics</h4> 
      </strong></Link>
      
    </Col>
    <Col style={{color:"white"}}>
    <Link to="/range" target="_self"  > <strong>
      <h4>price range</h4> 
      </strong></Link>
    </Col>
    </Row>
  </div>
  )
}

export default Categories