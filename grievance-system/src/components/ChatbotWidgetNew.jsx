import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Fade,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon, SmartToy as BotIcon, Person as PersonIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const ChatbotWidget = () => {
  const { state, toggleChatbot } = useAppContext();
  const { chatbotOpen } = state;

  const [messages, setMessages] = useState([
    { id: Date.now(), text: "Hi! I'm your Grievance Assistant. How can I help you?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // FAQ Responses
  const faqResponses = {
    greeting: ["Hello! How can I assist you today?", "Hi there! Ask me anything about grievances."],
    submit: ["To submit a grievance, go to the form, select category, provide details, and submit."],
    track: ["Track your grievance by entering your reference ID on the 'Track Status' page."],
    anonymous: ["You can submit grievances anonymously. Your identity is secure."],
    contact: ["Email: grievance@institution.edu | Phone: +1-234-567-8900"]
  };

  const quickReplies = [
    { text: "How to submit a grievance?", key: "submit" },
    { text: "Track my grievance", key: "track" },
    { text: "Anonymous submission", key: "anonymous" },
    { text: "Contact information", key: "contact" },
  ];

  const getRandomResponse = (responses) => responses[Math.floor(Math.random() * responses.length)];

  const generateResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hi') || text.includes('hello')) return getRandomResponse(faqResponses.greeting);
    if (text.includes('submit')) return getRandomResponse(faqResponses.submit);
    if (text.includes('track') || text.includes('status')) return getRandomResponse(faqResponses.track);
    if (text.includes('anonymous')) return getRandomResponse(faqResponses.anonymous);
    if (text.includes('contact')) return getRandomResponse(faqResponses.contact);
    return "I didn't understand that. Try one of the quick questions below or rephrase your query.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: generateResponse(inputText), sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (key) => {
    const botMessage = { id: Date.now(), text: getRandomResponse(faqResponses[key]), sender: 'bot', timestamp: new Date() };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [messages]);

  if (!chatbotOpen) return null;

  return (
    <Fade in={chatbotOpen}>
      <Paper sx={{ position: 'fixed', bottom: 20, right: 20, width: 350, height: 500, display: 'flex', flexDirection: 'column', borderRadius: 3, zIndex: 1300, overflow: 'hidden' }}>
        
        {/* Header */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}><BotIcon /></Avatar>
            <Typography variant="subtitle1">Grievance Assistant</Typography>
          </Box>
          <IconButton onClick={toggleChatbot} size="small" sx={{ color: 'white' }}><CloseIcon /></IconButton>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, p: 1, overflowY: 'auto' }}>
          <List sx={{ p: 0 }}>
            {messages.map(msg => (
              <ListItem key={msg.id} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', p: 0.5 }}>
                <Box display="flex" alignItems="flex-start" gap={1} flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: msg.sender === 'user' ? 'secondary.main' : 'primary.main' }}>
                    {msg.sender === 'user' ? <PersonIcon sx={{ fontSize: 14 }} /> : <BotIcon sx={{ fontSize: 14 }} />}
                  </Avatar>
                  <Paper sx={{ p: 1, borderRadius: 2, bgcolor: msg.sender === 'user' ? 'primary.light' : 'background.paper' }}>
                    <Typography variant="body2">{msg.text}</Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
            {isTyping && (
              <ListItem sx={{ p: 0.5 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}><BotIcon sx={{ fontSize: 14 }} /></Avatar>
                  <Paper sx={{ p: 1, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">Assistant is typing...</Typography>
                  </Paper>
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Quick Questions:</Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {quickReplies.map(reply => (
                  <Chip key={reply.key} label={reply.text} size="small" clickable onClick={() => handleQuickReply(reply.key)} />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Input */}
        <Box sx={{ p: 1 }}>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              variant="outlined"
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={!inputText.trim() || isTyping} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ChatbotWidget;
