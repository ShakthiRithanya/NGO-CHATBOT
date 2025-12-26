# Tamil Nadu NGO Connect - Backend API

Backend server for the Tamil Nadu NGO Connect chatbot application.

## 🚀 Features

- **RESTful API** for NGO data management
- **MongoDB** database with Mongoose ODM
- **Intelligent Chat Processing** with context-aware responses
- **Analytics & Reporting** for usage statistics
- **CRUD Operations** for NGO management
- **Search & Filter** by category, district, and keywords
- **Chat Logging** for conversation history
- **User Feedback** system

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ngo-chatbot
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
node seed.js
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### NGO Routes (`/api/ngos`)
- `GET /api/ngos` - Get all NGOs
- `GET /api/ngos/:id` - Get NGO by ID
- `GET /api/ngos/category/:category` - Get NGOs by category
- `GET /api/ngos/district/:district` - Get NGOs by district
- `GET /api/ngos/search/query?q=keyword` - Search NGOs
- `POST /api/ngos` - Create new NGO
- `PUT /api/ngos/:id` - Update NGO
- `DELETE /api/ngos/:id` - Delete NGO

### Chat Routes (`/api/chat`)
- `POST /api/chat/message` - Send chat message and get response
- `POST /api/chat/feedback` - Submit feedback for a chat
- `GET /api/chat/history/:sessionId` - Get chat history

### Analytics Routes (`/api/analytics`)
- `GET /api/analytics/stats` - Overall statistics
- `GET /api/analytics/chats` - Chat analytics
- `GET /api/analytics/feedback` - Feedback summary

## 📊 Data Models

### NGO Model
```javascript
{
  name: String,
  category: String (enum),
  location: String,
  districts: [String],
  focus: String,
  impact: String,
  contact: {
    phone: String,
    email: String,
    address: String
  },
  website: String,
  description: String,
  verified: Boolean,
  rating: Number,
  totalReviews: Number
}
```

### ChatLog Model
```javascript
{
  sessionId: String,
  userMessage: String,
  botResponse: String,
  category: String,
  district: String,
  ngosRecommended: [ObjectId],
  timestamp: Date,
  userFeedback: {
    helpful: Boolean,
    rating: Number
  }
}
```

## 🔧 Categories

- `education` - Education NGOs
- `healthcare` - Healthcare NGOs
- `environment` - Environment NGOs
- `women` - Women Empowerment NGOs
- `children` - Child Welfare NGOs
- `elderly` - Elderly Care NGOs
- `disability` - Disability Support NGOs
- `rural` - Rural Development NGOs

## 📝 Example API Calls

### Get all education NGOs:
```bash
GET http://localhost:5000/api/ngos/category/education
```

### Get NGOs in Chennai:
```bash
GET http://localhost:5000/api/ngos/district/chennai
```

### Send chat message:
```bash
POST http://localhost:5000/api/chat/message
Content-Type: application/json

{
  "sessionId": "user-123",
  "message": "Show me education NGOs"
}
```

### Get analytics:
```bash
GET http://localhost:5000/api/analytics/stats
```

## 🗂️ Project Structure

```
backend/
├── models/
│   ├── NGO.model.js
│   └── ChatLog.model.js
├── routes/
│   ├── ngo.routes.js
│   ├── chat.routes.js
│   └── analytics.routes.js
├── .env
├── server.js
├── seed.js
├── package.json
└── README.md
```

## 🔒 Security Notes

- Always use environment variables for sensitive data
- Implement authentication for admin routes in production
- Use HTTPS in production
- Validate and sanitize all user inputs
- Rate limit API endpoints

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Admin dashboard API
- [ ] Email notifications
- [ ] SMS integration
- [ ] Advanced NLP for chat processing
- [ ] Multi-language support
- [ ] File upload for NGO documents
- [ ] Payment gateway integration for donations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 📞 Support

For issues or questions, please contact: support@tnngoconnect.org
