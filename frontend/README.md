📦 CircleStore – Mini Marketplace

A mini marketplace web application where users can sign up, log in, upload products for sale, browse all listed products, and view seller details.
Built with React, Node.js, Express, MySQL, Tailwind CSS, and Cloudinary.

🚀 Live Demo

🔗 Frontend: Add your deployed Vercel link here
🔗 Backend API: Add your Render/Railway link here

✨ Features
👤 User Authentication

Signup with Name, Email, Phone, Password

Login with email & password

JWT-based authentication

Protected routes (Sell page)

🛒 Product Management

Authenticated users can list products with:

Product Name

Price

Description

Image upload (Cloudinary)

View all products on Home page

Click product → open modal with:

Product details

Seller name

Seller phone number

Owners can delete their products

💅 UI / UX

Clean, responsive UI using Tailwind CSS

Product grid layout

Modern modal design

Fully mobile-friendly

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

React Router

JWT decode

Backend

Node.js

Express.js

MySQL (mysql2)

JWT Authentication

Cloudinary (image hosting)

Multer (file upload)

🗄️ Database Schema (MySQL)
Users Table
Field	Type	Description
id	INT PK	Auto increment
name	VARCHAR(100)	User's name
email	VARCHAR(150)	Unique
phone	VARCHAR(20)	Seller phone
password_hash	VARCHAR(255)	Hashed password
created_at	TIMESTAMP	Default now
Products Table
Field	Type	Description
id	INT PK	Auto increment
user_id	INT	FK → users.id
name	VARCHAR(255)	Product name
price	DECIMAL	Product price
description	TEXT	Product desc
image_url	VARCHAR(512)	Cloudinary URL
created_at	TIMESTAMP	Default now
📂 Project Structure
Circlestore_assign/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── product.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Sell.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── components/
    │   │   ├── ProductCard.jsx
    │   │   └── ProductModal.jsx
    │   ├── utils/
    │   │   └── auth.js
    │   ├── api.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── tailwind.config.js

⚙️ Setup Instructions
🔧 Backend Setup

Go inside backend folder:

cd backend
npm install


Create a .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mini_marketplace
JWT_SECRET=yoursecretkey

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx


Run backend:

npm run dev

🎨 Frontend Setup

Go inside frontend folder:

cd frontend
npm install


Create .env:

REACT_APP_API_BASE=http://localhost:5000/api


Start:

npm start

🧪 API Endpoints
Auth
Method	Route	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
Products
Method	Route	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get single product
POST	/api/products	Create product (auth required)
DELETE	/api/products/:id	Delete product (owner only)
📸 Screenshots

(Add images after deployment)

![Homepage]()
![Sell Page]()
![Product Modal]()
![Login]()
![Signup]()

🧑‍💻 Author

Shivalika Sinha
CircleStore Assignment
