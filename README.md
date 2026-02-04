# 🚀 LeetCode SDE Tracker (MERN Stack)

A professional full-stack dashboard designed to track LeetCode progress in real-time. This project uses a **Monorepo** structure to manage a Node.js/Express backend and a vanilla JavaScript frontend.

## 🌟 Key Features
* **Smart Sync Logic**: Automatically updates the "Cloud Fridge" (MongoDB) when new problems are added.
* **RESTful API**: Full CRUD operations (Create, Read, Update, Delete) for managing problem data.
* **Real-time Dashboard**: Dynamic frontend that fetches and displays total problems solved and difficulty levels.
* **Secure Architecture**: Environment variables managed via `.env` and protected by `.gitignore`.

## 🏗️ Project Structure
```text
LeetCode-Tracker-Project/
├── Backend/          # Node.js & Express Server
│   ├── models/       # Database Schemas
│   └── script.js     # API Routes & Logic
├── Frontend/         # Dashboard UI
│   ├── index.html    
│   ├── style.css
│   └── app.js        # API Fetch Logic
└── .gitignore        # Security Rules
