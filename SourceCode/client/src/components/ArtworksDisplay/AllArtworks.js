import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Artworks from './Artworks';
import { getAllPosts } from '../../actions/artworks';


const AllArtworks = () => {
  //const user = JSON.parse(localStorage.getItem('profile'));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.artworks);

  useEffect(()=>{
    dispatch(getAllPosts());
  },[dispatch]);

  return (
    <div className='flex m-8 space-x-8'>
      <div className='w-full'>
        <Grid item xs={12} sm={12} md={12}>
          <Artworks className='overflow-auto' setCurrentId={setCurrentId}/>
        </Grid>
      </div>
    </div>
  )
}

export default AllArtworks