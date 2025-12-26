# 🚀 Backend Setup & Integration Guide

## ✅ Current Status

### Backend Created:
- ✅ Express server configured
- ✅ MongoDB models defined
- ✅ API routes created
- ✅ Dependencies installed (121 packages)
- ✅ Server running on `http://localhost:5000`

### Frontend Updated:
- ✅ API service layer created (`api.js`)
- ✅ API script added to HTML files
- ✅ Ready to connect to backend

## ⚠️ MongoDB Required

The backend needs MongoDB to store NGO data. You have 2 options:

### Option 1: Install MongoDB Locally (Recommended for Development)

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Install with default settings

2. **Start MongoDB:**
   ```powershell
   # MongoDB should start automatically after installation
   # Or start it manually:
   net start MongoDB
   ```

3. **Verify MongoDB is running:**
   ```powershell
   mongosh
   # Should connect to MongoDB shell
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Account:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free tier

2. **Create Cluster:**
   - Create a free M0 cluster
   - Choose a region close to you

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ngo-chatbot
   ```

## 🔧 Setup Steps

### 1. Install MongoDB (Choose Option 1 or 2 above)

### 2. Seed the Database

Once MongoDB is running:

```powershell
cd backend
node seed.js
```

This will populate the database with 11 sample NGOs across all categories.

### 3. Verify Backend is Running

The backend should already be running. Check:
- Open browser: `http://localhost:5000`
- You should see: "Welcome to Tamil Nadu NGO Connect API"

### 4. Test API Endpoints

```powershell
# Health check
curl http://localhost:5000/api/health

# Get all NGOs
curl http://localhost:5000/api/ngos

# Get education NGOs
curl http://localhost:5000/api/ngos/category/education
```

## 🌐 Frontend-Backend Integration

### Current Setup:

1. **Frontend**: Running on `http://localhost:5173` (Vite dev server)
2. **Backend**: Running on `http://localhost:5000` (Express server)

### API Service (`api.js`):

The frontend now has an API service layer that handles all backend communication:

```javascript
// Example usage in main.js:
const ngos = await api.getNGOsByCategory('education');
const response = await api.sendChatMessage(message, sessionId);
```

### Available API Functions:

- `api.getAllNGOs()` - Get all NGOs
- `api.getNGOsByCategory(category)` - Filter by category
- `api.getNGOsByDistrict(district)` - Filter by district
- `api.searchNGOs(query)` - Search NGOs
- `api.sendChatMessage(message, sessionId)` - Chat with bot
- `api.getChatHistory(sessionId)` - Get chat history
- `api.getStats()` - Get analytics

## 📊 What Happens Next?

### Without MongoDB:
- Backend runs but cannot store/retrieve data
- Frontend chatbot uses local data from `main.js`
- No chat history or analytics

### With MongoDB:
- Backend stores all NGO data in database
- Chat conversations are logged
- Analytics track popular searches
- User feedback is saved
- Data persists across sessions

## 🎯 Quick Start (After MongoDB is installed):

```powershell
# Terminal 1 - Backend
cd backend
node seed.js          # Seed database (one time)
npm run dev           # Start backend

# Terminal 2 - Frontend  
cd ..
npm run dev           # Start frontend

# Open browser: http://localhost:5173
```

## 🔄 Current Workflow:

1. **Frontend** (Vite) serves HTML/CSS/JS on port 5173
2. **Backend** (Express) serves API on port 5000
3. **Frontend** calls backend API using `api.js`
4. **Backend** queries MongoDB and returns data
5. **Frontend** displays data to user

## 📝 Next Steps:

### Immediate:
1. ✅ Install MongoDB (Option 1 or 2)
2. ✅ Run `node seed.js` to populate database
3. ✅ Test API endpoints
4. ✅ Update `main.js` to use backend API (optional)

### Optional Enhancements:
- Add user authentication
- Implement admin panel
- Add email notifications
- Integrate payment gateway for donations
- Add more NGOs to database
- Implement advanced search filters

## 🐛 Troubleshooting:

### Backend won't start:
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`

### MongoDB connection error:
- Ensure MongoDB is running: `net start MongoDB`
- Check connection string in `.env` file
- For Atlas: Verify IP whitelist and credentials

### Frontend can't reach backend:
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure `api.js` is loaded before `main.js`

## 📞 Support:

If you encounter issues:
1. Check the terminal for error messages
2. Verify MongoDB is running
3. Check browser console for errors
4. Review backend logs in terminal

---

**Your backend is ready! Just install MongoDB and seed the database to get started! 🎉**
