import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost, updatePost } from "../../actions/artworks";
import useStyles from "./artwork_style";
import Popup from "../../utils/modals/Popup";

const Artwork = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // Get subscriptioninfo
  const subscriptionInfo = useSelector((state) => state.subscriptionReducer);
  const [showPopup, setShowPopup] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  let sProfile = JSON.parse(localStorage.getItem("seller_profile"));
  let uProfile = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId); //make sure each user only can like onece

  const handleLike = async () => {
    if (subscriptionInfo.status === "active") {
      dispatch(likePost(post._id));

      if (hasLikedPost) {
        setLikes(post.likes.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }
    } else {
      setShowPopup(true);
    }
  };

  const handleEvent = () => {
    document.body.style.overflow = "unset";
    if (sProfile) {
      navigate("/sellerCenter/articles");
    } else if (uProfile) {
      navigate("/subscription");
    } else {
      alert("Unauthorized access!!!");
    }
  };

  if (showPopup) {
    document.body.style.overflow = "hidden";
    return (
      <Popup
        show={showPopup}
        setShow={setShowPopup}
        setShowPlans={setShowPlans}
        description={
          "You need to be a subscriber to be able to access Like Artworks feature!"
        }
        buttonText={"View Plans"}
        handleEvent={handleEvent}
      />
    );
  } else {
    console.log(showPopup, "popup");
    document.body.style.overflow = "unset";
  }

  const Likes = () => {
    if (likes.find((like) => like === userId)) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <div className="text-gray-400 text-md">
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{likes.length} {likes.length > 1 ? "Likes" : "Like"}
      </div>
    );
  };

  // const openPost = (e) => {
  //   // dispatch(getPost(post._id, history));

  //   history.push(`/posts/${post._id}`);
  // };

  return (
    <Card
      className="flex flex-col justify-between relative rounded-sm"
      raised
      elevation={6}
    >
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        //onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className="flex justify-between px-2">
          <Typography
            className="text-gray-600"
            gutterBottom
            variant="h7"
            component="h2"
          >
            {post.title}
          </Typography>
          {/* <Button size="small" color="primary" className='text-red-500' disabled={!user?.result} onClick={handleLike}>
            <Likes/>
          </Button> */}
          <Button
            size="small"
            color="primary"
            className="text-red-500"
            onClick={handleLike}
          >
            <Likes />
          </Button>
        </div>
      </ButtonBase>
    </Card>
  );
};

export default Artwork;
