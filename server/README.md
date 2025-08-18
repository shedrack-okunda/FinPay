# FinPay Backend (Server)

This is the backend server for **FinPay**, a MERN-based fintech application.  
It handles authentication, wallets, transactions, invoices, cards, beneficiaries, notifications, and exchange rates.  

---

## 🚀 Installation & Setup

1. Clone the repo and navigate into the server folder:
   ```bash
   cd server
Install dependencies:

npm install


Create a .env file in the server folder with the following variables:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key


Start the server in development mode:

npm run dev


Build & run in production:

npm start

📂 File Structure
server/
│── controllers/       # Controller logic for routes
│── models/            # Mongoose models
│── routes/            # API routes
│── middleware/        # Middleware (auth, error handling)
│── config/            # DB and environment config
│── server.js          # Main server file

📡 API Endpoints
🔐 Authentication

POST /api/auth/signup → Register new user

POST /api/auth/login → Login & get JWT

GET /api/user/profile → Get logged in user profile

PUT /api/user/profile → Update user profile

👤 User

PUT /api/user/security → Update password / 2FA

GET /api/user/kyc → Get KYC status

💰 Wallet

GET /api/wallets → Get all wallets & balances

POST /api/wallets/:id/fund → Fund wallet

POST /api/wallets/:id/transfer → Send money

POST /api/wallets/:id/convert → Convert funds

💳 Cards

GET /api/cards → Get user cards

POST /api/cards → Create new card

DELETE /api/cards/:id → Delete card

📑 Invoices

GET /api/invoices → Get invoices

POST /api/invoices → Create invoice

PUT /api/invoices/:id → Update invoice

DELETE /api/invoices/:id → Delete invoice

🏦 Transactions

GET /api/tran
sactions → List transactions

GET /api/transactions/:id → Get transaction details

👥 Beneficiaries

GET /api/beneficiaries → Get beneficiaries

POST /api/beneficiaries → Add beneficiary

🔔 Notifications

GET /api/notifications → Get notifications

PUT /api/notifications/:id/read → Mark as read

💱 Exchange Rates

GET /api/exchange-rates → Get latest rates

🛠 Tech Stack

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Nodemon (dev)
