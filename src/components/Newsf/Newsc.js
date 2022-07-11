import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsAPI } from "../../config/Api";
import { render } from "@testing-library/react";
import "./Newsc.css";
import { Form, FormControl, Button } from "react-bootstrap";

const Newsc = () => {
  const [News, setNews] = useState([]);
  const [search, setSearch] = useState("btc");
  const fetchNews = async () => {
    const { data } = await axios.get(NewsAPI(search));
    setNews(data.articles);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(News);

  const newslist = News.slice(0, 10).map((eachnews) => {
    return (
      <div key={eachnews.urlToImage}>
        <div className="float-container">
          <div className="float-child-1">
            {eachnews.urlToImage ? (
              <img
                className="img"
                src={eachnews.urlToImage}
                onClick={() => {
                  window.open(eachnews.url);
                }}
              ></img>
            ) : (
              <img src="https://via.placeholder.com/500x300.png?text=No+Image+Available"></img>
            )}
          </div>

          <div className="float-child-2">
            <div className="right-content">
              <div className="news-title">
                <p> {eachnews.title} </p>
              </div>
              <div className="news-content">{eachnews.description}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="main">
      <div className="search-title">Latest Crypto News </div>

      <Form className="search-news">
        <FormControl
          type="search"
          placeholder="Search News"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />      
        </Form>


        <Button
          variant="success"
          onClick={(e) => {
            e.preventDefault();
            fetchNews();
          }}
        >
          Search
        </Button>

      <div className="main-news">{newslist}</div>
    </div>
  );
};

export default Newsc;
