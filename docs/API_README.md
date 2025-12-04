# UNIPORT Backend API Documentation

## Overview
The UNIPORT backend is a Node.js/Express REST API that provides CRUD operations for managing wallets, transactions, and alerts for a Web3 terminal application.

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Port**: 5001 (default)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Installation
```bash
cd Backend
npm install
```

### Environment Variables
Create a `.env` file in the Backend directory:
```env
PORT=5001
MONGO_URL=mongodb://127.0.0.1:27017/WEB3-TERMINAL-Backend
```

### Running the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5001`

---

## API Endpoints

### Base URL
```
http://localhost:5001/api
```

---

## 1. Wallets API

Manage cryptocurrency wallet addresses.

### Data Model
```typescript
{
  _id: ObjectId,
  address: string,      // Wallet address
  label: string,        // User-friendly name
  chain: string,        // Blockchain (e.g., "Ethereum", "Polygon")
  userId: ObjectId,     // Reference to user
  createdAt: Date
}
```

### Endpoints

#### Create Wallet
```http
POST /api/wallets
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "label": "My Main Wallet",
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Response (201 Created)**
```json
{
  "_id": "507f191e810c19729de860ea",
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "label": "My Main Wallet",
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:30:00.000Z"
}
```

#### Get Wallets
```http
GET /api/wallets?userId=507f1f77bcf86cd799439011
```

**Response (200 OK)**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "label": "My Main Wallet",
    "chain": "Ethereum",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-04T10:30:00.000Z"
  }
]
```

#### Update Wallet
```http
PUT /api/wallets/:id
Content-Type: application/json

{
  "label": "Updated Wallet Name"
}
```

**Response (200 OK)**
```json
{
  "_id": "507f191e810c19729de860ea",
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "label": "Updated Wallet Name",
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:30:00.000Z"
}
```

#### Delete Wallet
```http
DELETE /api/wallets/:id
```

**Response (200 OK)**
```json
{
  "message": "Wallet deleted"
}
```

---

## 2. Transactions API

Track blockchain transactions.

### Data Model
```typescript
{
  _id: ObjectId,
  hash: string,         // Transaction hash
  from: string,         // Sender address
  to: string,           // Recipient address
  value: number,        // Transaction value
  chain: string,        // Blockchain
  userId: ObjectId,     // Reference to user
  createdAt: Date
}
```

### Endpoints

#### Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "hash": "0x1234567890abcdef",
  "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "to": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  "value": 1.5,
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Response (201 Created)**
```json
{
  "_id": "507f191e810c19729de860eb",
  "hash": "0x1234567890abcdef",
  "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "to": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  "value": 1.5,
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:35:00.000Z"
}
```

#### Get Transactions
```http
GET /api/transactions?userId=507f1f77bcf86cd799439011
```

**Response (200 OK)**
```json
[
  {
    "_id": "507f191e810c19729de860eb",
    "hash": "0x1234567890abcdef",
    "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "to": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    "value": 1.5,
    "chain": "Ethereum",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-04T10:35:00.000Z"
  }
]
```

#### Update Transaction
```http
PUT /api/transactions/:id
Content-Type: application/json

{
  "value": 2.0
}
```

**Response (200 OK)**
```json
{
  "_id": "507f191e810c19729de860eb",
  "hash": "0x1234567890abcdef",
  "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "to": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  "value": 2.0,
  "chain": "Ethereum",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:35:00.000Z"
}
```

#### Delete Transaction
```http
DELETE /api/transactions/:id
```

**Response (200 OK)**
```json
{
  "message": "Transaction deleted"
}
```

---

## 3. Alerts API

Manage price alerts for cryptocurrencies.

### Data Model
```typescript
{
  _id: ObjectId,
  symbol: string,           // Token symbol (e.g., "ETH", "BTC")
  targetPrice: number,      // Price threshold
  condition: "above" | "below",  // Alert trigger condition
  userId: ObjectId,         // Reference to user
  createdAt: Date
}
```

### Endpoints

#### Create Alert
```http
POST /api/alerts
Content-Type: application/json

{
  "symbol": "ETH",
  "targetPrice": 3500,
  "condition": "above",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Response (201 Created)**
```json
{
  "_id": "507f191e810c19729de860ec",
  "symbol": "ETH",
  "targetPrice": 3500,
  "condition": "above",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:40:00.000Z"
}
```

#### Get Alerts
```http
GET /api/alerts?userId=507f1f77bcf86cd799439011
```

**Response (200 OK)**
```json
[
  {
    "_id": "507f191e810c19729de860ec",
    "symbol": "ETH",
    "targetPrice": 3500,
    "condition": "above",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-04T10:40:00.000Z"
  }
]
```

#### Update Alert
```http
PUT /api/alerts/:id
Content-Type: application/json

{
  "targetPrice": 4000
}
```

**Response (200 OK)**
```json
{
  "_id": "507f191e810c19729de860ec",
  "symbol": "ETH",
  "targetPrice": 4000,
  "condition": "above",
  "userId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-04T10:40:00.000Z"
}
```

#### Delete Alert
```http
DELETE /api/alerts/:id
```

**Response (200 OK)**
```json
{
  "message": "Alert deleted"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

---

## Testing with cURL

### Example: Create a Wallet
```bash
curl -X POST http://localhost:5001/api/wallets \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "label": "My Main Wallet",
    "chain": "Ethereum",
    "userId": "507f1f77bcf86cd799439011"
  }'
```

### Example: Get All Wallets
```bash
curl http://localhost:5001/api/wallets?userId=507f1f77bcf86cd799439011
```

### Example: Update a Wallet
```bash
curl -X PUT http://localhost:5001/api/wallets/507f191e810c19729de860ea \
  -H "Content-Type: application/json" \
  -d '{"label": "Updated Wallet Name"}'
```

### Example: Delete a Wallet
```bash
curl -X DELETE http://localhost:5001/api/wallets/507f191e810c19729de860ea
```

---

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── controllers/
│   │   ├── walletController.ts
│   │   ├── transactionController.ts
│   │   └── alertController.ts
│   ├── models/
│   │   ├── Wallet.ts
│   │   ├── Transaction.ts
│   │   └── Alert.ts
│   ├── routes/
│   │   ├── walletRoutes.ts
│   │   ├── transactionRoutes.ts
│   │   └── alertRoutes.ts
│   └── middlewares/
├── server.ts                  # Entry point
├── package.json
└── tsconfig.json
```

---

## Summary of CRUD Operations

| Resource     | Create | Read | Update | Delete |
|-------------|--------|------|--------|--------|
| Wallets     | ✅     | ✅   | ✅     | ✅     |
| Transactions| ✅     | ✅   | ✅     | ✅     |
| Alerts      | ✅     | ✅   | ✅     | ✅     |

All three resources have complete CRUD functionality implemented.

---

## Notes
- All endpoints require a `userId` to filter/associate data
- MongoDB must be running before starting the server
- The server uses TypeScript with ES modules
- Auto-reload is enabled in development mode via nodemon
