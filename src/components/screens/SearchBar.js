import React, { useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProducts } from "../../actions/productAction";
const SearchBar = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const filters = {};
  
      if (keyword.trim()) {
        filters.keyword = keyword.trim();
      }
  
      if (category) {
        filters.category = category;
      }
  
      if (minPrice) {
        filters.minPrice = minPrice;
      }
  
      if (maxPrice) {
        filters.maxPrice = maxPrice;
      }
  
      dispatch(listProducts(filters));
    };
  
    return (
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          name="keyword"
          placeholder="Keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          {/* Add more options for categories */}
        </Form.Control>
        <Form.Control
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Form.Control
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button type="submit" variant="outline-light">
          Search
        </Button>
      </Form>
    );
  };
  