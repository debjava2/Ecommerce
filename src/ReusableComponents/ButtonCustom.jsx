import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      textAlign:'center'
    },
  }));

const ButtonCustom = (items) => {
  const classes = useStyles();
    
  return (
    <div>
        <Button
        variant={items.variant}
        color={items.color}
        size={items.size}
        className={classes.button}
        startIcon={items.startIcon=='Save'? 
        <SaveIcon/> : items.startIcon=='Delete' 
        ? <DeleteIcon/> : items.startIcon=="Cloud" ? <CloudUploadIcon/>:<KeyboardVoiceIcon/> }
        onClick={items.onClick}
      >{items.Title}</Button>
    </div>
  )
}

export default ButtonCustom