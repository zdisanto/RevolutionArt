import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { likePost, deletePost, updatePost } from '../../actions/artworks';
import useStyles from './artwork_style';

const Artwork = ({ post, setCurrentId }) => {
  const seller = JSON.parse(localStorage.getItem('seller_profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();

  const sellerId = seller?.result.googleId || seller?.result?._id;
  //const hasLikedPost = post.likes.find((like) => like === sellerId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    // if (hasLikedPost) {
    //   setLikes(post.likes.filter((id) => id !== sellerId));
    // } else {
    //   setLikes([...post.likes, sellerId]);
    // }
  };

  const Likes = () => {
    // if (likes.length > 0) {
    //   return likes.find((like) => like === sellerId)
    //     ? (
    //       <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
    //     ) : (
    //       <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
    //     );
    // }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  // const openPost = (e) => {
  //   // dispatch(getPost(post._id, history));

  //   history.push(`/posts/${post._id}`);
  // };

  return (
    <Card className='flex flex-col justify-between relative rounded-sm' raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        //onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          {/* <Typography variant="h8">{post.name}</Typography> */}
          <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(seller?.result?.googleId === post?.creator || seller?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              //e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h7" component="h2">{post.title}</Typography>
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.description.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent> */}
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!seller?.result}>
          <Likes/>
        </Button>
        <button onClick={() => dispatch(deletePost(post._id, history))}>
          <DeleteIcon className='text-red-400 hover:text-red-600' />
        </button>
      </CardActions>
    </Card>
  );
};

export default Artwork;