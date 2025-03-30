import { useState } from "react";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Paper,
  ListItemButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Navbar from "../components/Navbar";

const chatList = [
  { id: 1, name: "ShipperLords", message: "I Have A Query Regarding A Cost." },
  { id: 2, name: "Golden Bros", message: "I Have A Query Regarding A Cost." },
  { id: 3, name: "PharmaTechno", message: "I Have A Query Regarding A Cost." },
  { id: 4, name: "MetaGeeks", message: "I Have A Query Regarding A Cost." },
];

const ChatInbox = () => {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [chatMessages, setChatMessages] = useState<
    {
      sender: string;
      text: string;
      time: string;
      fileUrl?: string;
      fileType?: string;
    }[]
  >([
    {
      sender: "ShipperLords",
      text: "Yeah! I have an upcoming shipment tom.",
      time: "Today, 2:00 PM",
    },
    {
      sender: "You",
      text: "Mind sharing rate request?",
      time: "Today, 12:00 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = (
    message: string,
    fileUrl?: string,
    fileType?: string
  ) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: message, fileUrl, fileType, time: "Just now" },
    ]);
    setNewMessage("");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const fileUrl = URL.createObjectURL(file);
    const fileType = file.type;

    // 1️⃣ Display the file first in the chat
    sendMessage(`📄 Shared a file: ${file.name}`, fileUrl, fileType);

    // 2️⃣ Process the file for OCR
    if (fileType.startsWith("image/")) {
      extractTextFromImage(file);
    } else if (fileType === "application/pdf") {
      extractTextFromPDF(file);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractTextFromDocx(file);
    } else {
      sendMessage(
        "❌ Unsupported file type. Please upload an image, PDF, or DOCX."
      );
      setIsProcessing(false);
    }
  };

  const extractTextFromImage = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = e.target?.result as string;
      try {
        const { data } = await Tesseract.recognize(image, "eng");
        sendMessage(`📜 Extracted Text:\n${data.text.trim()}`);
      } catch {
        sendMessage("❌ Error extracting text from image.");
      }
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText +=
          textContent.items.map((item) => (item as any).str).join(" ") + "\n";
      }

      sendMessage(`📜 Extracted Text:\n${extractedText.trim()}`);
      setIsProcessing(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      try {
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        sendMessage(`📜 Extracted Text:\n${value.trim()}`);
      } catch {
        sendMessage("❌ Error extracting text from DOCX.");
      }
      setIsProcessing(false);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Navbar />
      <Box display="flex" height="92vh">
        {/* Chat List */}
        <Box width={"25%"} borderRight={1} borderColor="divider" p={2}>
          <Typography variant="h6" fontWeight="bold">
            Inbox
          </Typography>
          <List>
            {chatList.map((chat) => (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton onClick={() => setSelectedChat(chat)}>
                  <ListItemAvatar>
                    <Avatar>{chat.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={chat.name} secondary={chat.message} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Window */}
        <Box flex={1} display="flex" flexDirection="column" p={2}>
          <Typography variant="h6" fontWeight="bold">
            {selectedChat.name}
          </Typography>
          <Box
            flex={1}
            overflow="auto"
            bgcolor="rgb(163, 200, 246)"
            borderRadius={2}
            p={2}
          >
            {chatMessages.map((msg, index) => (
              <Box
                key={index}
                mb={2}
                alignSelf={msg.sender === "You" ? "flex-end" : "flex-start"}
              >
                <Typography variant="body2" fontWeight="bold">
                  {msg.sender}
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    maxWidth: "75%",
                    backgroundColor:
                      msg.sender === "You" ? "#e3f2fd" : "#ffffff",
                  }}
                >
                  {/* Display file attachment */}
                  {msg.fileUrl ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      {msg.fileType?.startsWith("image/") ? (
                        <InsertPhotoIcon color="primary" />
                      ) : (
                        <DescriptionIcon color="primary" />
                      )}
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {msg.text}
                      </a>
                    </Box>
                  ) : (
                    msg.text
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary">
                  {msg.time}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Message Input & File Upload */}
          <Box
            display="flex"
            alignItems="center"
            p={1}
            borderTop={1}
            borderColor="divider"
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage(newMessage)}
              disabled={isProcessing}
            />
            <IconButton component="label">
              <AttachFileIcon />
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
                accept="image/*,.pdf,.docx"
              />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => sendMessage(newMessage)}
              disabled={isProcessing}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatInbox;
