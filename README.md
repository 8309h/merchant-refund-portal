
# Merchant Refund Portal

A full-stack **Merchant Refund Portal** that allows merchants to log in, view their transaction history, and initiate refund requests on eligible transactions.

The system enforces strict refund eligibility rules and maintains a **status timeline for each transaction**.

---

# Live Demo

Frontend URL

```
https://merchant-refund-portal-dusky.vercel.app
```

Backend API

```
https://merchant-refund-portal-g6xl.onrender.com
```

---

# Test Credentials

Merchant 1

```
Email: merchant1@test.com
Password: Test@1234
```

Merchant 2

```
Email: merchant2@test.com
Password: Test@1234
```

Each merchant has **separate transaction histories seeded in the database**.

---

# Tech Stack

## Frontend

* React (Vite)
* TypeScript
* React Router
* TanStack React Query
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Infrastructure

* MongoDB Atlas (Database)
* Render (Backend hosting)
* Vercel (Frontend hosting)

---

# System Architecture

```
React Frontend
      │
      │ REST API
      ▼
Node.js / Express Backend
      │
      │ Mongoose ODM
      ▼
MongoDB Atlas
```

### Flow

1. Merchant logs in using email/password
2. Backend verifies credentials and returns a **JWT token**
3. Frontend stores token in **localStorage**
4. Token is attached to all protected API requests
5. Backend validates token via middleware
6. Merchant accesses their transactions and refund options

---

# Folder Structure

## Backend

```
backend
│
├── node_modules
│
├── src
│
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   └── refundController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── Merchant.js
│   │   ├── Transaction.js
│   │   ├── Refund.js
│   │   └── StatusEvent.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── refundRoutes.js
│   │
│   ├── utils
│   │   └── seedTransactions.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Frontend

```
frontend
│
├── node_modules
├── public
│   └── favicon.svg
│
├── src
│
│   ├── api
│   │   └── axios.ts
│   │
│   ├── components
│   │   ├── RefundModal.tsx
│   │   ├── Timeline.tsx
│   │   └── TransactionTable.tsx
│   │
│   ├── pages
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── TransactionDetail.tsx
│   │
│   ├── routes
│   │   └── ProtectedRoute.tsx
│   │
│   ├── styles
│   │   └── dashboard.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

---

# Database Design

## Merchants

```
_id
email
password
name
createdAt
```

---

## Transactions

```
_id
merchantId
transactionId
amount
status
createdAt
```

Status values

```
Successful
Failed
Pending
Refunded
```

---

## Refunds

```
_id
transactionId
merchantId
refundAmount
reason
createdAt
```

---

## Transaction Status Events

Used for the **timeline feature**.

```
_id
transactionId
status
createdAt
```

Example timeline

```
Initiated
Processing
Successful
Refunded
```

---

# Refund Eligibility Rules

The backend strictly enforces the following rules:

1. Transaction must have status **Successful**
2. A transaction can only be refunded **once**
3. Refund must be raised **within 30 days**
4. Refund amount **cannot exceed the original transaction amount**
5. **Partial refunds are allowed**

If any rule fails, the backend returns a **clear error message**.

---

# API Endpoints

## Authentication

### Login

```
POST /auth/login
```

Request

```
{
  "email": "merchant1@test.com",
  "password": "Test@1234"
}
```

---

## Transactions

### List Transactions

```
GET /transactions
```

Supports filters

```
?page=1
&status=Successful
&search=TX123
&fromDate=2026-03-01
&toDate=2026-03-10
```

---

### Transaction Detail

```
GET /transactions/:id
```

Returns

```
transaction
timeline
```

---

## Refunds

### Create Refund

```
POST /refunds
```

Request

```
{
  "transactionId": "TX12345",
  "amount": 100,
  "reason": "Product damaged"
}
```

---

# Database Indexes

Indexes were added to improve query performance for filtering and pagination.

### Transactions Collection

```
merchantId
transactionId
status
createdAt
```

Compound index

```
merchantId + status + createdAt
```

Purpose

| Index         | Reason                   |
| ------------- | ------------------------ |
| merchantId    | isolate merchant data    |
| transactionId | fast search              |
| status        | filtering                |
| createdAt     | sorting and date queries |

---

### Refunds Collection

```
transactionId (unique index)
```

Purpose

Prevents **duplicate refunds** for the same transaction.

---

# UI Features

Dashboard supports

* Pagination
* Status filter
* Transaction search
* Date range filter
* Loading state
* Empty state

Transaction detail page supports

* Status timeline
* Refund request form
* Refund validation errors

---

# Environment Variables

Example `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

# Running the Project Locally

### Backend

```
cd backend
npm install
npm run dev
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

---

# Author

Harshal Wagh
Associate Software Engineer

---

