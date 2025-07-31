# 💳 Digital Wallet Management System - Backend
> A secure and scalable RESTful API for managing digital wallet operations with role-based access control.

---

## 📌 Quick Links

- 🎥 [Overview Video](https://youtu.be/your-video-link)
- 🌐 [Live Demo](https://wallet-management.vercel.app)
- 🧠 [ER Diagram (Draw.io)](https://app.diagrams.net/?splash=0#G1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz)
- 🗂️ [ER Diagram (Google Drive)](https://drive.google.com/file/d/1QCTlaziJvm-ju8ES27C4qvEUh6Xemuyz/view)

---

## 🛠️ Tech Stack

- **🧠 Backend:** **Node.js**, **Express**, **TypeScript**
- **🗄️ Database:** **MongoDB** with **Mongoose**
- **🔐 Authentication:** **JWT**, **Session**, **Passport.js**
- **✅ Validation:** **Zod**
- **🧹 Code Quality:** **ESLint**, **Prettier**



## Clone the repository
git clone https://github.com/your-username/backend-digital-wallet.git
cd backend-digital-wallet

## Install dependencies
npm install

## Run in development
npm run dev

## Build for production
npm run build




| Folder/File               | Path                           | Description                |
| ------------------------- | ------------------------------ | -------------------------- |
| `app/modules/user`        | `src/app/modules/user/`        | User controllers, services |
| `app/modules/auth`        | `src/app/modules/auth/`        | Authentication logic       |
| `app/modules/wallet`      | `src/app/modules/wallet/`      | Wallet operations          |
| `app/modules/transaction` | `src/app/modules/transaction/` | Transaction handling       |
| `app/modules/commission`  | `src/app/modules/commission/`  | Commission system          |
| `app/middlewares`         | `src/app/middlewares/`         | Custom middleware          |
| `config`                  | `src/config/`                  | Configuration files        |
| `utils`                   | `src/utils/`                   | Utility functions          |
| `server.ts`               | `src/server.ts`                | Server entry point         |






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







<!-- src/
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
└── server.ts              # Server entry point -->


