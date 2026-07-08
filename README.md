<div align="center">

<img src="https://raw.githubusercontent.com/david9sargsian9s/SSR-forge-TS/main/Banner.jpg" alt="SSR-ForgeTS Banner" width="100%" />

# 🛠️ SSR-ForgeTS

> **A minimalist, scalable, and production-ready Server-Side Rendering boilerplate built with TypeScript, Node.js, and Express.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white&style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://www.mongodb.com/)
[![AccessControl](https://img.shields.io/badge/RBAC-AccessControl-FF5722?style=flat-square)](https://github.com/Onury/accesscontrol)

<h3>
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture--project-structure">Architecture</a> •
  <a href="#-security--rbac-matrix">Security & RBAC</a> •
  <a href="#%EF%B8%8F-getting-started">Getting Started</a>
</h3>

</div>

---

## ⚡ Overview

**SSR-ForgeTS** is a lightweight yet powerful boilerplate designed for modern server-side rendering applications. It provides a clean, type-safe, and scalable architecture out of the box while eliminating unnecessary boilerplate. The project is built with maintainability, developer experience, and long-term scalability in mind.

---

## 🚀 Key Features

- **Strict Type Safety** — Built entirely with TypeScript for improved reliability and maintainability.
- **Enterprise RBAC (Role-Based Access Control)** — Granular permission management powered by `accesscontrol`.
- **Dual-Mode Security Middleware** — Automatically distinguishes between page requests and API requests, providing redirects for SSR and JSON responses for REST APIs.
- **Production-Ready Architecture** — Modular project structure designed for maintainability and future expansion.
- **MongoDB Integration** — Pre-configured database layer ready for real-world applications.

---

## 🏗️ Architecture & Project Structure

The project follows a clean and modular architecture, making each layer easy to understand, test, and extend.

```text
SSR-forge-TS/
├── src/
│   ├── config/             # Environment configuration & RBAC matrix
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Authentication & authorization
│   ├── models/             # Mongoose models
│   ├── routes/             # Application routes
│   └── types/              # Global TypeScript declarations
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🛡️ Security & RBAC Matrix

The project uses a **declarative Role-Based Access Control (RBAC)** system. Authorization is driven by a centralized permission matrix, making access rules easy to maintain and extend.

### Default Roles

- 👤 User
- 🛠️ Moderator
- 👑 Admin

### Granular Route Protection

Authentication is performed first, followed by authorization (permission) validation.

```ts
import { Router } from 'express';
import { getAccessFromCheck } from '../middlewares/getAccessToken';
import { checkPermission } from '../middlewares/checkPermission';

const router = Router();

router.get(
  '/products',
  getAccessFromCheck,
  checkPermission('readAny', 'products'),
  getProducts
);
```

### Response Strategy

#### 🌐 Server-Side Rendered Pages

Unauthorized page requests are automatically redirected to:

- `/auth/login` — if authentication is required.
- `/no-access` — if the user lacks the required permissions.

This provides a smooth user experience without exposing inaccessible pages.

#### 🔌 REST API / Fetch Requests

API requests receive standard JSON responses with the appropriate HTTP status codes, making client-side error handling simple and predictable.

---

## ⚙️ Getting Started

### Prerequisites

Before running the project, ensure you have installed:

- Node.js **v20+**
- MongoDB

---

### 1. Clone the Repository

```bash
git clone https://github.com/david9sargsian9s/SSR-forge-TS.git
cd SSR-forge-TS
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=4500
MONGO_URI=mongodb://localhost:27014/ssr-forge
JWT_SECRET=your_super_secure_jwt_secret_key
```

---

### 4. Run the Project

#### Development

```bash
npm run dev
```

Runs the application with automatic reload using **Nodemon**.

#### Production

```bash
npm run build
npm start
```

---

## 📄 License

Distributed under the **MIT License**.

Feel free to use, modify, and distribute this project for both personal and commercial purposes.
