import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsAPI } from "../../config/Api";
import { render } from "@testing-library/react";
import "./Newsc.css";
import { Form, FormControl } from "react-bootstrap";

const Newsc = () => {
  const [News, setNews] = useState([]);
const [search, setSearch] = useState(["Crypto"])
  const fetchNews = async () => {
    const { data } = await axios.get(NewsAPI(search));
    setNews(data.articles);
  };

  console.log(search)
  useEffect(() => {
    fetchNews();
  }, [search]);

  console.log(News);

  const coinslist = News.slice(0, 10).map((eachnews) => {
    return (
        <div className="container"  >
      <div className="each-news" onClick={()=>{
        window.open(eachnews.url)
        
      }} > 
        <img className="img" src={eachnews.urlToImage}></img>
        <div className="title">{eachnews.title}</div>
        <div className="content">{eachnews.content}</div>
      </div>
      </div>
    );
  });

  return <div className="main-news">
      <div className="news-title">Latest Crypto News </div>

      <Form className="search-news">
              <FormControl
                type="search"
                placeholder="Search News"
                aria-label="Search"
                value={search}
                onChange={(e)=>{
                    e.preventDefault();

                setSearch(e.target.value)
                }}  
              />
        </Form>

      {coinslist}
      </div>;
};

export default Newsc;


//style={{backgroundImage: `url(${eachnews.urlToImage})` , height:"100%" , width:"100%" }}