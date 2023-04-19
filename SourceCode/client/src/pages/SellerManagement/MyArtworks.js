import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Artworks from './Artworks';
import useStyles from './styles';
import AddArtwork from './AddArtwork'
import { getPosts } from '../../actions/artworks';

const MyArtworks = () => {
  const seller = JSON.parse(localStorage.getItem('seller_profile'));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.artworks);
  const classes = useStyles();

  useEffect(()=>{
    dispatch(getPosts(seller.result._id));
  },[dispatch]);


  //if (!posts.length && !isLoading) return 'No posts';
  return (
    <div className='flex space-x-8'>
      <div className='h-full w-1/2'>
        <AddArtwork currentId={currentId} setCurrentId={setCurrentId}/>
      </div>
      <div className='w-1/2'>
        <Grid item xs={12} sm={12} md={12}>
          <Artworks className='overflow-auto h-1/2' setCurrentId={setCurrentId}/>
        </Grid>
      </div>
    </div>
  )
}

export default MyArtworks
