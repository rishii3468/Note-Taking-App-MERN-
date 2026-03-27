# 📝 Note Taking App (MERN)

A full-stack Note Taking Application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. Users can securely create, manage, and organize notes with a clean and responsive interface.

---

## 🚀 Features

* ✍️ Create, edit, and delete notes
* 🔐 User authentication (JWT-based)
* 📱 Responsive UI
* ⚡ Fast React frontend with REST API backend
* 🗂️ Organized note management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS / Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📁 Project Structure

```id="projstruct"
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── constants/
├── server.js

frontend/
├── src/
├── public/
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash id="clonecmd"
git clone https://github.com/rishii3468/Note-Taking-App-MERN-.git
cd Note-Taking-App-MERN-
```

---

### 2. Backend Setup

```bash id="backendsetup"
cd backend
npm install
```

Create `.env` file:

```env id="envsetup"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash id="runbackend"
npm start
```

---

### 3. Frontend Setup

```bash id="frontendsetup"
cd frontend
npm install
npm start
```

---

## 🌐 Usage

* Visit: `http://localhost:3000`
* Register or login
* Start creating and managing notes

---

## 📦 API Overview

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/notes     | Fetch all notes |
| POST   | /api/notes     | Create a note   |
| PUT    | /api/notes/:id | Update a note   |
| DELETE | /api/notes/:id | Delete a note   |

---

## 👨‍💻 Author

**Rishi**
GitHub: https://github.com/rishii3468

---
