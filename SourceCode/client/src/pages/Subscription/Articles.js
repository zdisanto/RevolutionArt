import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";

const Articles = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/articles");
    setArticles(response.data);
  };

  return (
    <div>
      {articles.length ? (
        <div className="h-full w-full">
          <div className="text-center text-2xl font-bold py-5">Your Subscription at a Glance</div>
          {articles.map((article) => (
            <div className="" key={article.id}>
              <img className="w-5/6 h-5/6 mx-20" src={article.imageUrl} alt={article.title} />
              <h2 className="text-center py-4">{article.title}</h2>
              <p className="mx-20">{article.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Articles;
