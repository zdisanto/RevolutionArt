import React from 'react'
import { useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
import Artwork from './Artwork'

const Artworks = ({setCurrentId}) => {
  const posts = useSelector((state)=>state.artworks);

  return (
    !posts.length? <CircularProgress/> :(
      <Grid className='flex flex-row justify-between items-center' container>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={6} sm={6} md={6}>
            <Artwork post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Artworks
