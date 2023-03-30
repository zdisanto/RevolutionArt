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
        <div className="h-full w-full">
            <div className="text-center text-2xl font-bold"><h2>Your Subscription at a Glance</h2></div>

          {articles.map((article) => (
            <div>
            <div key={article.id}>
              <img className="w-5/6 h-5/6 mx-20" src={article.imageUrl} alt={article.title} />
              <h2 className="text-center py-4 font-bold">{article.title}</h2>
              <p className="mx-20">{article.content}</p>
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
