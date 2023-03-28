import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import Subscription from "./Subscription";

const SellerArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get("http://localhost:5000/articles");
    setArticles(response.data);
  };
  console.log("文章长度是："+articles.length+articles)

  return (
    <>
      {articles.length ? (
        <div className="plan-container">
            <div className="title-article"><h2>Your Subscription at a Glance</h2></div>

          {articles.map((article) => (
            <div>
            <div className="article-card" key={article.id}>
              <img src={article.imageUrl} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>
            <Subscription/>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerArticles;
