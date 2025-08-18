
---

## 📌 2. `client/README.md`
```markdown
# FinPay Frontend (Client)

This is the React frontend for **FinPay**, a MERN-based fintech application.  
It includes authentication, dashboard, wallets, transactions, invoices, cards, beneficiaries, notifications, and user profile.

---

## 🚀 Installation & Setup

1. Navigate into the client folder:
   ```bash
   cd client
Install dependencies:

npm install


Create a .env file inside client:

VITE_API_URL=http://localhost:5000/api


Run the app in development:

npm run dev


Build for production:

npm run build

📂 File Structure
client/
│── src/
│   │── components/      # Reusable components (Sidebar, Navbar, Forms)
│   │── pages/           # Pages (Dashboard, Wallets, Transactions, Invoices, Cards, Profile)
│   │── services/        # API service functions (axios)
│   │── context/         # Auth context, state management
│   │── hooks/           # Custom hooks
│   │── assets/          # Images, icons
│   │── App.jsx          # Root component
│   │── main.jsx         # Entry point
│── public/              # Static assets
│── vite.config.js       # Vite config

🛠 Tech Stack

React (Vite + JSX)

TailwindCSS

Axios (API calls)

React Router (routing)

Context API (auth & state management)
