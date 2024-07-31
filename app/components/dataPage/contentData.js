import { Box } from "@mui/material";
import styles from './contentData.module.css';
import InventoryDataFrame from "./inventory/inventoryDF";
import ChatBot from "./chatbot/chatbot";

const DataPage = () => {
    return (
        <Box className={styles.page}>
            <ChatBot />
            <InventoryDataFrame />
        </Box>
    )
}

export default DataPage;