import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { addArtwork, updateArtwork} from '../../actions/artworks';
import useStyles from './styles';

const AddArtwork = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ title: '', description: '', tags: [], selectedFile: '' });
    
    const post = useSelector((state) => currentId? state.artworks.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
  
    const seller = JSON.parse(localStorage.getItem('seller_profile'));
    const history = useNavigate();

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', description: '', tags: [], selectedFile: '' });
      };
    
      useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(currentId==0){
          dispatch(addArtwork({ ...postData, name: seller?.result?.gallery_name }, history));
          clear();
        }else{
          dispatch(updateArtwork(currentId, { ...postData, name: seller?.result?.gallery_name }));
          clear();
        }
    };

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };
  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Add an Artwork'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default AddArtwork
