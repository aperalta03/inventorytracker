import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import styles from './chatbot.module.css';
import { fetchInventory } from "../inventory/inventoryLogic";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inventory, setInventory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const getInventory = async () => {
      const items = await fetchInventory();
      setInventory(items.map(item => item.name));
    };
    getInventory();
  }, []);

  const handleSendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    const inventoryList = inventory.join(", ");
    const prompt = `User's inventory includes: ${inventoryList}. User asked: ${userMessage}. Suggest a recipe. Only mention it alongside the ingredients, don't bother with the instructions.`;

    try {
      const response = await fetch('/api/chatbotLogic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      // Simulate a delay
      setTimeout(() => {
        setIsTyping(false);
        if (response.ok) {
          setMessages(prevMessages => [...prevMessages, { sender: "bot", text: data.botMessage }]);
        } else {
          throw new Error(data.error);
        }
      }, 1000); // 2-second delay
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, { sender: "bot", text: "Sorry, something went wrong. Please try again." }]);
    }
  };

  return (
    <Box className={styles.mainContainer}>
      <Box className={styles.chatContainer}>
        <Typography className={styles.backgroundText}>Recipe Recommender</Typography>
        {messages.map((msg, index) => (
          <Typography key={index} className={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </Typography>
        ))}
        {isTyping && <Typography className={styles.typingIndicator}>AI is cooking...</Typography>}
      </Box>
      <Box className={styles.inputBoxContainer}>
        <TextField 
          className={styles.inputBox}
          placeholder="Type a message" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent', // initial border color
              },
              '&:hover fieldset': {
                borderColor: 'transparent', // hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // focused border color
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // remove the border color on focus
            },
          }}
          InputProps={{
            style: {
              padding: 0,
              height: '100%',
              alignItems: 'center'
            }
          }}
        />
        <Button onClick={handleSendMessage} className={styles.sendButton}>Send</Button>
      </Box>
    </Box>
  );
}

export default ChatBot;
