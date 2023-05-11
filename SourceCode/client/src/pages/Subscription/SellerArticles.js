import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import Subscription from "./Subscription";
import ShowMessage from "../../utils/modals/ShowMessage";
import ConfirmationModal from "../../utils/modals/ConfirmationModal";

const SellerArticles = ({showMessageModal, setShowMessageModal, unsubscribedConfirm, setUnsubscribedConfirm, shouldUnsubscription, setShouldUnsubscription}) => {
  const [articles, setArticles] = useState([]);
  // const [showMessageModal, setShowMessageModal] = useState(false);
  // const [unsubscribedConfirm, setUnsubscribedConfirm] = useState(false);
  // const [shouldUnsubscription, setShouldUnsubscription] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/articles"
    );
    setArticles(response.data);
  };

  return (
    <>
      {articles.length ? (
        <div className="h-full w-full">
          <div className="text-center text-2xl font-bold">
            <h2>Your Subscription at a Glance</h2>
          </div>

          {articles.map((article) => (
            <div key={article._id}>
              <div>
                <img
                  className="w-5/6 h-5/6 mx-20"
                  src={article.imageUrl}
                  alt={article.title}
                />
                <h2 className="text-center py-4 font-bold">{article.title}</h2>
                <p className="mx-20">{article.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>
            <Subscription showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal} unsubscribedConfirm={unsubscribedConfirm} setUnsubscribedConfirm={setUnsubscribedConfirm} shouldUnsubscription={shouldUnsubscription} setShouldUnsubscription={setShouldUnsubscription} />
          </div>
        </div>
      )}
    </>
  );
};

export default SellerArticles;
