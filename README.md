# 💳 Digital Wallet Management System - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

> A secure RESTful API for digital wallet operations with role-based access control

## 📌 Quick Links
- [Overview Video](https://youtu.be/your-video-link)
- [Live Demo](https://wallet-management.vercel.app)
- [ER Diagram (Draw.io)](https://app.diagrams.net/?splash=0#G1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz)
- [ER Diagram (Drive)](https://drive.google.com/file/d/1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz/view)

## 🛠️ Tech Stack
```bash
Backend:    Node.js | Express | TypeScript
Database:  MongoDB (Mongoose)
Auth:      JWT + Session | Passport.js
Validation: Zod
Linting:   ESLint + Prettier
```
## 🚀 Features
interface Features {
  authentication: "JWT + Session";
  authorization: "Admin | Agent | User";
  walletOperations: ["add", "withdraw", "transfer"];
  transactionTracking: true;
  realTimeUpdates: "wallet status";
  commissionSystem: true;
}

PORT=5000
DB_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>
NODE_ENV=development

# JWT Configuration
JWT_ACCESS_SECRET=digital_wallet
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES=7d

# Session
EXPRESS_SESSION_SECRET=express-session



# Clone repository
git clone https://github.com/your-username/backend-digital-wallet.git
cd backend-digital-wallet

# Install dependencies
npm install

# Run in development
npm run dev

# Build production
npm run build




### User Routes
POST   /user/register         # Register new user
PATCH  /user/update           # Update user (Admin)
GET    /user/all-users        # List all users (Admin)
GET    /user/all-agents       # List all agents (Admin)

### Wallet Routes
POST   /wallet/add            # Add money (Agent)
POST   /wallet/withdraw       # Withdraw money (User)
POST   /wallet/transfer-money # Transfer money (User)
GET    /wallet/all-wallet     # All wallets (Admin)
GET    /wallet/my-wallet      # My wallet (User/Agent)
PATCH  /wallet/:id            # Update wallet (Admin)

### Transaction Routes
GET    /trans/all-transactions  # All transactions (Admin)
GET    /trans/your-transactions # My transactions (User/Agent)

### Commission Routes
GET    /com/all-agent-com      # All commissions (Admin)
GET    /com/agent-com         # My commissions (Agent)



src/
├── app/
│   ├── modules/
│   │   ├── user/        # User controllers, services
│   │   ├── auth/        # Authentication logic
│   │   ├── wallet/      # Wallet operations
│   │   ├── transaction/ # Transaction handling
│   │   └── commission/  # Commission system
│   └── middlewares/     # Custom middleware
├── config/              # Configuration files
├── utils/               # Utility functions
├── server.ts            # Server entry point

## Notes: 
1. Add money operation goes to Agent
2. Withdraw money operation goes to User
3. Admin has full system access
4. Agents can add money to user wallets
5. Users can withdraw/transfer their money