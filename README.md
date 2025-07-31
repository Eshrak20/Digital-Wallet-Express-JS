# 💳 Digital Wallet Management System - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

> A secure and scalable RESTful API for managing digital wallet operations with role-based access control.

---

## 📌 Quick Links

- 🎥 [Overview Video](https://youtu.be/your-video-link)
- 🌐 [Live Demo](https://wallet-management.vercel.app)
- 🧠 [ER Diagram (Draw.io)](https://app.diagrams.net/?splash=0#G1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz)
- 🗂️ [ER Diagram (Google Drive)](https://drive.google.com/file/d/1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz/view)

---

## 🛠️ Tech Stack

```bash
Backend:    Node.js | Express | TypeScript
Database:   MongoDB (Mongoose)
Auth:       JWT + Session | Passport.js
Validation: Zod
Linting:    ESLint + Prettier
```

PORT=5000
DB_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>
NODE_ENV=development

# JWT Configuration
JWT_ACCESS_SECRET=digital_wallet
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES=7d

# Session Secret
EXPRESS_SESSION_SECRET=express-session



# Clone the repository
git clone https://github.com/your-username/backend-digital-wallet.git
cd backend-digital-wallet

# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build


| Method | Endpoint           | Access | Description         |
| ------ | ------------------ | ------ | ------------------- |
| POST   | `/user/register`   | Public | Register new user   |
| PATCH  | `/user/update`     | Admin  | Update user details |
| GET    | `/user/all-users`  | Admin  | Get all users       |
| GET    | `/user/all-agents` | Admin  | Get all agents      |


| Method | Endpoint                 | Access     | Description                |
| ------ | ------------------------ | ---------- | -------------------------- |
| POST   | `/wallet/add`            | Agent      | Add money to user wallet   |
| POST   | `/wallet/withdraw`       | User       | Withdraw money from wallet |
| POST   | `/wallet/transfer-money` | User       | Transfer money to another  |
| GET    | `/wallet/all-wallet`     | Admin      | View all wallets           |
| GET    | `/wallet/my-wallet`      | User/Agent | View own wallet            |
| PATCH  | `/wallet/:id`            | Admin      | Update wallet info         |


| Method | Endpoint                   | Access     | Description             |
| ------ | -------------------------- | ---------- | ----------------------- |
| GET    | `/trans/all-transactions`  | Admin      | All system transactions |
| GET    | `/trans/your-transactions` | User/Agent | Your own transactions   |


| Method | Endpoint             | Access | Description            |
| ------ | -------------------- | ------ | ---------------------- |
| GET    | `/com/all-agent-com` | Admin  | All commissions data   |
| GET    | `/com/agent-com`     | Agent  | My commission earnings |


src/
├── app/
│   ├── modules/
│   │   ├── user/          # User controllers, services
│   │   ├── auth/          # Authentication logic
│   │   ├── wallet/        # Wallet operations
│   │   ├── transaction/   # Transaction handling
│   │   └── commission/    # Commission system
│   └── middlewares/       # Custom middleware
├── config/                # Configuration files
├── utils/                 # Utility functions
└── server.ts              # Server entry point


"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
  "lint": "npx eslint ./src",
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "tsc",
  "vercel-build": "npm run build"
}
