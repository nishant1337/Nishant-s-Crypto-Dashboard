import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import "./Navbarc.css";
import { Crypto } from "../../CryptoContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { coinsuggestions } from "../../config/Data";
import { Link } from "react-router-dom";

const Navbarc = () => {
  const { Currency, Symbol, setCurrency } = useContext(Crypto);
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
              <Nav.Link href="/portfolio">Portfolio</Nav.Link>
            </Nav>

            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
              
                items={coinsuggestions}
                autoFocus
                onSelect={(e) => {
                  window.open(`/coins/${e.name.toLowerCase()}`);
                }}
              >
              <Link to={`/coins/cardano}`}></Link>

              </ReactSearchAutocomplete>
            </div>

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
