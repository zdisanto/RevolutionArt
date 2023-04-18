import React from 'react'
import { useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
import Artwork from './Artwork'

const Artworks = ({setCurrentId}) => {
  const posts = useSelector((state)=>state.artworks);

  return (
    !posts.length? <CircularProgress/> :(
      <Grid className='flex flex-row justify-between items-center p-4 h-full bg-pink-300 overflow-y-scroll' container spacing={1}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={12}>
            <Artwork post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Artworks
