# 🤖 AI Interview Platform

An AI-powered full-stack interview preparation platform that helps users prepare for technical interviews by generating AI-based interview questions, submitting answers, and receiving AI-generated feedback with scores.

## 🚀 Features

- User Authentication (Register/Login)
- JWT-based Authentication
- Protected Routes
- Resume Management
- AI-generated Interview Questions
- AI-based Answer Evaluation
- Question-wise Feedback
- Overall Interview Score
- RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- CORS
- dotenv

### AI
- Google Gemini API

---

## 📂 Project Structure

```
AI-INTERVIEW-PLATFORM
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── public
    ├── src
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## 📌 Main Functionalities

- User Registration & Login
- Resume Management
- AI-powered Interview Generation
- Interview Answer Submission
- AI Feedback & Evaluation
- Overall Score Calculation
- Secure Authentication
- Protected Routes

---

## 🔮 Future Enhancements

- Resume Editing
- Interview Editing
- PDF Resume Upload
- Voice-based Interview
- Dashboard Analytics
- Improved UI/UX
- Dark Mode
- AI Follow-up Questions

---

## 👨‍💻 Developed By

**Shardendu Kumar**

---

## ⭐ Star this repository if you found it useful!
