import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import styles from './form.module.css';

const Form = ({ itemName, setItemName, expirationDate, setExpirationDate, addItem, handleClose }) => { // Modify this line

  return (
    <Box className={styles.modal}>
      <Typography id="modal-modal-title" className={styles.modalText}>
        ADD ITEM
      </Typography>
      <Stack className={styles.modalStack}>
        <TextField
          id="outlined-basic" 
          label="Item Name" 
          variant="outlined"
          fullWidth 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color when hovered
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Label color when focused
            },
          }}
        />
        <TextField 
          id="outlined-basic" 
          label="Exp. (Days)" 
          variant="outlined"
          fullWidth 
          value={expirationDate} 
          onChange={(e) => setExpirationDate(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color when hovered
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Label color when focused
            },
          }} 
        />
        <Button 
          variant="contained"
          className={styles.modalButton}
          onClick={() => {
            if (itemName && expirationDate) {
              addItem(itemName, expirationDate); // Modify this line
              setItemName('');
              setExpirationDate('');
              handleClose();
            } else {
              alert('Please fill in all fields.');
            }
          }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
