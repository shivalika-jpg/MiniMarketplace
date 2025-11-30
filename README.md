📦 CircleStore – Mini Marketplace Web App

CircleStore is a full-stack mini-marketplace where users can sign up, log in, upload products for sale, and view items listed by others. Built using React, Node.js, Express, MySQL, Aiven, and Cloudinary, the platform supports secure authentication, image uploads, and a clean modern UI.

🚀 Live Demo
🔗 Frontend (Vercel):

https://mini-marketplace-five.vercel.app/

🔗 Backend (Render):

https://minimarketplace.onrender.com

Replace these with your actual deployed URLs.

🛠️ Tech Stack
Frontend

React.js

React Router

Tailwind CSS

Fetch API

JWT-based auth handling

Backend

Node.js

Express.js

MySQL (Aiven Cloud Database)

Cloudinary (Image Uploads)

JWT Authentication

Multer for file handling

Deployment

Frontend → Vercel

Backend → Render

Database → Aiven MySQL

Image hosting → Cloudinary

✨ Features
🔐 User Authentication

Signup with name, phone number, email, password

Login with email/password

JWT token-based authentication

Logout functionality

🛒 Marketplace Features

Authenticated users can list products for sale

Each product includes:

Product name

Price

Description

Image (uploaded to Cloudinary)

Products are displayed on the Home page with:

Name

Price

Image

🔍 Product Details Modal

Clicking a product opens a modal containing:

Seller name

Seller phone number

Product details

Product image

Delete button (only for product owner)

🗑️ Product Management

Only the uploader can delete their product

Instant UI update after login, signup, and delete

🎨 Modern UI

Fully responsive

Tailwind CSS based styling

Clean layout and smooth interactions

📁 Project Structure
project/
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    |   ├── pages/
    |   ├── components/
    |   ├── context/
    |   ├── api.js
    |   ├── App.js
    └── package.json

🧰 Environment Variables
Backend (.env)
DB_HOST=your_aiven_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=defaultdb

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

Frontend (.env)
REACT_APP_API_BASE=https://your-backend.onrender.com/api

🧪 How to Run Locally
1️⃣ Clone repo
git clone https://github.com/your-repo-url.git

2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Install frontend dependencies
cd ../frontend
npm install

4️⃣ Start backend
npm run dev

5️⃣ Start frontend
npm start

⚙️ Database Schema
Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Products Table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  price DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(512),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

🙌 Author

Shivalika Sinha
Aspiring SDE | React & Node Developer
GitHub: https://github.com/shivalika-jpg
