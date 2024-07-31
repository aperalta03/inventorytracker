import { Box, TextField, Button, Modal } from "@mui/material";
import { fetchInventory, addItemToInventory, removeItemFromInventory } from "./inventoryLogic";
import { useEffect, useState } from "react";
import Form from "./form/form";
import InventoryTable from "./table/table";
import VoiceChatButton from "./voicechat/voicechat";
import styles from './inventoryDF.module.css';

const InventoryDataFrame = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateInventory = async (query = '') => {
    const inventoryList = await fetchInventory(query);
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item, expirationDate) => {
    const updatedInventory = await addItemToInventory(item, expirationDate);
    setInventory(updatedInventory);
  };

  const removeItem = async (item) => {
    const updatedInventory = await removeItemFromInventory(item);
    setInventory(updatedInventory);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    updateInventory(e.target.value);
  };

  return (
    <Box className={styles.mainContainer}>
      {/* Pop Up Message */}
      <Modal open={open} onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Form
          itemName={itemName}
          setItemName={setItemName}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          addItem={addItem}
          handleClose={handleClose}
        />
      </Modal>
      {/* Add Button */}
      <Box className={styles.addingContainer}>
        <TextField 
          className={styles.searchBar} 
          placeholder="Search..." 
          value={searchQuery} 
          onChange={handleSearch}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />
        <Button className={styles.addButton} onClick={handleOpen}>
          Add
        </Button>
        <VoiceChatButton />
      </Box>
      {/* Content Container */}
      <Box className={styles.content}>
        <InventoryTable inventory={inventory} removeItem={removeItem} />
      </Box>
    </Box>
  );
};

export default InventoryDataFrame;
