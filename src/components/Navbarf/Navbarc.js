import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "./Navbarc.css";
import { CryptoState } from "../../CryptoContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { coinsuggestions } from "../../config/Data";
const Navbarc = () => {
  const { Currency, setCurrency } = CryptoState();
  const [searchtext, setSearchtext] = useState("cardano");
  return (
    <div className="navbar">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Crypto Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/ ">Home</Nav.Link>
              <Nav.Link href="/fear">Fear And Greed</Nav.Link>
              <Nav.Link href="/news">News</Nav.Link>
            </Nav>

            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                items={coinsuggestions}
                autoFocus
                onSelect={(e) => {
                  console.log(e);
                  window.open(`/coins/${e.name.toLowerCase()}`);
                }}
              />
            </div>
            {/*
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(`/coins/${searchtext}`);
              }}
            >
              <FormControl
                type="search"
                placeholder="Search Coin"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearchtext(e.target.value);
                }}
              ></FormControl> */}

            <Dropdown className="dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {Currency}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    setCurrency("USD");
                  }}
                >
                  USD
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    setCurrency("CAD");
                  }}
                >
                  CAD
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    setCurrency("INR");
                  }}
                >
                  INR
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarc;




