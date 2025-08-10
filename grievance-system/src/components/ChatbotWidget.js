import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  Button,
  Divider,
  Fade,
  Paper,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const ChatbotWidget = () => {
  const { state, toggleChatbot } = useAppContext();
  const { chatbotOpen } = state;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Grievance Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // FAQ responses database
  const faqResponses = {
    greeting: [
      "Hello! I'm here to help you with any questions about the grievance system.",
      "Hi there! How can I assist you with your grievance today?",
      "Welcome! I'm your virtual assistant for grievance-related queries.",
    ],
    submitGrievance: [
      "To submit a grievance:\n1. Click 'Anonymous Feedback' in the navigation\n2. Select your category\n3. Provide a detailed description\n4. Optionally attach supporting documents\n5. Choose if you want to submit anonymously\n6. Click 'Submit Grievance'",
      "You can submit a grievance by going to the Anonymous Feedback page. Fill out the form with your category, description, and any attachments. You'll receive a reference ID to track your complaint.",
    ],
    trackStatus: [
      "To track your grievance status:\n1. Go to 'Track Status' page\n2. Enter your reference ID (e.g., GRV001234)\n3. Click 'Search'\n4. You'll see detailed status information and timeline",
      "Use the reference ID you received when submitting your grievance to track its progress on the Status Tracking page.",
    ],
    anonymous: [
      "Yes, you can submit grievances anonymously. Your identity will be completely confidential, and only the grievance details will be shared with the relevant department.",
      "Anonymous submissions are fully supported. Toggle the 'Submit Anonymously' switch when filling out the form.",
    ],
    categories: [
      "Available grievance categories include:\n• Academic Issues\n• Hostel/Accommodation\n• Harassment/Discrimination\n• Fee/Financial Issues\n• Infrastructure Problems\n• Administrative Issues\n• Other",
    ],
    urgency: [
      "Urgency levels help prioritize your grievance:\n• Low: General feedback or minor issues\n• Medium: Standard complaints requiring attention\n• High: Serious issues affecting academic/personal well-being\n• Critical: Urgent matters requiring immediate action",
    ],
    timeline: [
      "Typical grievance processing timeline:\n• Submitted: Immediate\n• Under Review: 1-3 business days\n• In Progress: 5-10 business days\n• Resolved: Varies based on complexity",
      "Response times depend on the category and urgency of your grievance. You'll receive regular updates via the tracking system.",
    ],
    contact: [
      "If you need direct assistance:\n• Email: grievance@institution.edu\n• Phone: +1-234-567-8900\n• Office Hours: Mon-Fri, 9 AM - 5 PM\n• Emergency: Available 24/7 for critical issues",
    ],
    roles: [
      "Different roles have different access levels:\n• Student: Submit and track grievances\n• Faculty: Submit grievances and view department issues\n• Admin: Manage all grievances and users\n• Grievance Officer: Process and update grievance status",
    ],
  };

  const quickReplies = [
    { text: "How to submit a grievance?", key: "submitGrievance" },
    { text: "Track my grievance", key: "trackStatus" },
    { text: "Anonymous submission", key: "anonymous" },
    { text: "Grievance categories", key: "categories" },
    { text: "Contact information", key: "contact" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Greeting patterns
    if (lowerInput.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return getRandomResponse(faqResponses.greeting);
    }

    // Submit grievance
    if (lowerInput.includes('submit') || lowerInput.includes('file') || lowerInput.includes('complaint')) {
      return getRandomResponse(faqResponses.submitGrievance);
    }

    // Track status
    if (lowerInput.includes('track') || lowerInput.includes('status') || lowerInput.includes('reference')) {
      return getRandomResponse(faqResponses.trackStatus);
    }

    // Anonymous
    if (lowerInput.includes('anonymous') || lowerInput.includes('confidential')) {
      return getRandomResponse(faqResponses.anonymous);
    }

    // Categories
    if (lowerInput.includes('category') || lowerInput.includes('categories') || lowerInput.includes('type')) {
      return getRandomResponse(faqResponses.categories);
    }

    // Urgency
    if (lowerInput.includes('urgency') || lowerInput.includes('priority') || lowerInput.includes('urgent')) {
      return getRandomResponse(faqResponses.urgency);
    }

    // Timeline
    if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('when')) {
      return getRandomResponse(faqResponses.timeline);
    }

    // Contact
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
      return getRandomResponse(faqResponses.contact);
    }

    // Roles
    if (lowerInput.includes('role') || lowerInput.includes('permission') || lowerInput.includes('access')) {
      return getRandomResponse(faqResponses.roles);
    }

    // Default response
    return "I understand you're asking about '" + input + "'. Could you please rephrase your question or try one of the quick replies below? I'm here to help with grievance-related queries.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = generateResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleQuickReply = (key) => {
    const response = getRandomResponse(faqResponses[key]);
    const botMessage = {
      id: messages.length + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!chatbotOpen) return null;

  return (
    <Fade in={chatbotOpen}>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 350,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          zIndex: 1300,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <BotIcon />
            </Avatar>
          }
          title="Grievance Assistant"
          subheader="Online - Ready to help"
          action={
            <IconButton onClick={toggleChatbot} size="small">
              <CloseIcon />
            </IconButton>
          }
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '& .MuiCardHeader-title': {
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
            },
            '& .MuiCardHeader-subheader': {
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.875rem',
            },
          }}
        />

        {/* Messages Area */}
        <CardContent
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List sx={{ flex: 1, p: 0 }}>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  px: 1,
                  py: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '80%',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main',
                    }}
                  >
                    {message.sender === 'user' ? (
                      <PersonIcon sx={{ fontSize: 14 }} />
                    ) : (
                      <BotIcon sx={{ fontSize: 14 }} />
                    )}
                  </Avatar>
                  <Box>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                        color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'pre-line',
                          wordBreak: 'break-word',
                        }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                        textAlign: message.sender === 'user' ? 'right' : 'left',
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <ListItem sx={{ px: 1, py: 0.5 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                    <BotIcon sx={{ fontSize: 14 }} />
                  </Avatar>
                  <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Assistant is typing...
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Quick questions:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {quickReplies.map((reply) => (
                  <Chip
                    key={reply.key}
                    label={reply.text}
                    size="small"
                    variant="outlined"
                    clickable
                    onClick={() => handleQuickReply(reply.key)}
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>

        <Divider />

        {/* Input Area */}
        <Box sx={{ p: 2 }}>
          <Box display="flex" gap={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'action.disabledBackground',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ChatbotWidget;