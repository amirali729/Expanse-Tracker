# Expense Tracker API Contract

## Overview

This document defines the API contract for the Expense Tracker application across Version 1 and Version 2.

### Base URL

```text
/api/v1
```

Version 2 endpoints use:

```text
/api/v2
```

### Authentication

Protected endpoints require:

```text
Authorization: Bearer <accessToken>
```

The authenticated user's ID is obtained from the access token. Clients must not send `userId` when creating or modifying user-owned resources.

### Common Response Structure

Successful responses use:

```json
{
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

`data` may be an object, array, or `null` depending on the endpoint.

### Transaction Types

```text
INCOME
EXPENSE
```

### Account Types

The exact enum may be adjusted during implementation. The initial contract uses:

```text
BANK
CASH
WALLET
OTHER
```

---

# Version 1 — Core Expense Tracker

Version 1 provides authentication, account management, categories, transactions, and the dashboard.

---

## 1. Authentication

### 1.1 Sign Up

**Endpoint**

```text
POST /api/v1/users/auth/signup
```

**Authentication**

Not required.

**Request Body**

```json
{
  "data": {
    "username": "amir",
    "email": "amir@example.com",
    "password": "password123"
  }
}
```

**Response — 201 Created**

```json
{
  "statusCode": 201,
  "message": "Account created successfully",
  "data": {
    "id": 1,
    "username": "amir",
    "email": "amir@example.com",
    "createdAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

### 1.2 Login

**Endpoint**

```text
POST /api/v1/users/auth/login
```

**Authentication**

Not required.

**Request Body**

```json
{
  "data": {
    "email": "amir@example.com",
    "password": "password123"
  }
}
```

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "username": "amir",
    "email": "amir@example.com",
    "accessToken": "access-token",
    "refreshToken": "refresh-token"
  }
}
```

---

### 1.3 Logout

**Endpoint**

```text
POST /api/v1/users/auth/logout
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Logout successful",
  "data": null
}
```

---

## 2. Account Management

### 2.1 Create Account

**Endpoint**

```text
POST /api/v1/users/accounts
```

**Authentication**

Required.

**Request Body**

```json
{
  "name": "HBL Bank",
  "type": "BANK",
  "provider": "HBL"
}
```

`provider` is optional.

**Response — 201 Created**

```json
{
  "statusCode": 201,
  "message": "Account created successfully",
  "data": {
    "id": 1,
    "name": "HBL Bank",
    "type": "BANK",
    "provider": "HBL",
    "createdAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

### 2.2 View Accounts

**Endpoint**

```text
GET /api/v1/users/accounts
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Accounts retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "HBL Bank",
      "type": "BANK",
      "provider": "HBL",
      "createdAt": "2026-08-21T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Cash",
      "type": "CASH",
      "provider": null,
      "createdAt": "2026-08-21T10:30:00.000Z"
    }
  ]
}
```

---

### 2.3 View Account Details

**Endpoint**

```text
GET /api/v1/users/accounts/:accountId
```

**Authentication**

Required.

**Path Parameter**

```text
accountId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Account retrieved successfully",
  "data": {
    "id": 1,
    "name": "HBL Bank",
    "type": "BANK",
    "provider": "HBL",
    "createdAt": "2026-08-21T10:00:00.000Z",
    "updatedAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

## 3. Category Management

### 3.1 Create Category

**Endpoint**

```text
POST /api/v1/users/categories
```

**Authentication**

Required.

**Request Body**

```json
{
  "name": "Food",
  "description": "Food and groceries"
}
```

**Response — 201 Created**

```json
{
  "statusCode": 201,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Food",
    "description": "Food and groceries",
    "createdAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

### 3.2 View Categories

**Endpoint**

```text
GET /api/v1/users/categories
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Food",
      "description": "Food and groceries",
      "createdAt": "2026-08-21T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Transport",
      "description": "Transportation expenses",
      "createdAt": "2026-08-21T10:10:00.000Z"
    }
  ]
}
```

---

## 4. Transaction Management

### 4.1 Create Transaction

**Endpoint**

```text
POST /api/v1/users/transactions
```

**Authentication**

Required.

**Request Body**

```json
{
  "amount": 1500,
  "transactionType": "EXPENSE",
  "categoryId": 1,
  "accountId": 2,
  "transactionDate": "2026-08-21T10:00:00.000Z",
  "description": "Grocery shopping"
}
```

`description` is optional. `transactionDate` is required by the data model.

**Response — 201 Created**

```json
{
  "statusCode": 201,
  "message": "Transaction created successfully",
  "data": {
    "id": 1,
    "amount": 1500,
    "transactionType": "EXPENSE",
    "categoryId": 1,
    "accountId": 2,
    "transactionDate": "2026-08-21T10:00:00.000Z",
    "description": "Grocery shopping",
    "createdAt": "2026-08-21T10:00:00.000Z"
  }
}
```

The server obtains `userId` from the authenticated user. The client must not send it.

---

### 4.2 View Transactions

**Endpoint**

```text
GET /api/v1/users/transactions
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping",
      "createdAt": "2026-08-21T10:00:00.000Z"
    }
  ]
}
```

---

### 4.3 View Transaction Details

**Endpoint**

```text
GET /api/v1/users/transactions/:transactionId
```

**Authentication**

Required.

**Path Parameter**

```text
transactionId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transaction retrieved successfully",
  "data": {
    "id": 1,
    "amount": 1500,
    "transactionType": "EXPENSE",
    "categoryId": 1,
    "accountId": 2,
    "transactionDate": "2026-08-21T10:00:00.000Z",
    "description": "Grocery shopping",
    "createdAt": "2026-08-21T10:00:00.000Z",
    "updatedAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

### 4.4 Edit Transaction

**Endpoint**

```text
PATCH /api/v1/users/transactions/:transactionId
```

**Authentication**

Required.

**Path Parameter**

```text
transactionId: number
```

**Request Body**

All fields are optional because this is a partial update.

```json
{
  "amount": 1800,
  "transactionType": "EXPENSE",
  "categoryId": 1,
  "accountId": 2,
  "transactionDate": "2026-08-21T11:00:00.000Z",
  "description": "Grocery and household shopping"
}
```

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transaction updated successfully",
  "data": {
    "id": 1,
    "amount": 1800,
    "transactionType": "EXPENSE",
    "categoryId": 1,
    "accountId": 2,
    "transactionDate": "2026-08-21T11:00:00.000Z",
    "description": "Grocery and household shopping",
    "updatedAt": "2026-08-21T11:00:00.000Z"
  }
}
```

---

### 4.5 Delete Transaction

**Endpoint**

```text
DELETE /api/v1/users/transactions/:transactionId
```

**Authentication**

Required.

**Path Parameter**

```text
transactionId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transaction deleted successfully",
  "data": null
}
```

---

## 5. Dashboard

### 5.1 Get Dashboard

**Endpoint**

```text
GET /api/v1/users/dashboard
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Dashboard retrieved successfully",
  "data": {
    "totalBalance": 85000,
    "totalIncome": 120000,
    "totalExpenses": 35000,
    "accounts": [
      {
        "id": 1,
        "name": "HBL Bank",
        "balance": 60000
      },
      {
        "id": 2,
        "name": "Cash",
        "balance": 25000
      }
    ],
    "recentTransactions": [
      {
        "id": 1,
        "amount": 1500,
        "transactionType": "EXPENSE",
        "categoryId": 1,
        "accountId": 2,
        "transactionDate": "2026-08-21T10:00:00.000Z",
        "description": "Grocery shopping"
      }
    ]
  }
}
```

---

# Version 2 — Reporting & Management

Version 2 adds password recovery, profile management, account/category management, transaction filtering, and reports.

---

## 6. Authentication

### 6.1 Forgot Password

**Endpoint**

```text
POST /api/v2/users/auth/forgot-password
```

**Authentication**

Not required.

**Request Body**

```json
{
  "email": "amir@example.com"
}
```

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Password reset instructions have been sent",
  "data": null
}
```

---

### 6.2 Reset Password

**Endpoint**

```text
POST /api/v2/users/auth/reset-password
```

**Authentication**

Not required. The reset token authenticates the operation.

**Request Body**

```json
{
  "token": "password-reset-token",
  "newPassword": "newPassword123"
}
```

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Password reset successfully",
  "data": null
}
```

---

### 6.3 View User Profile

**Endpoint**

```text
GET /api/v2/users/profile
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "username": "amir",
    "email": "amir@example.com",
    "createdAt": "2026-08-21T10:00:00.000Z",
    "updatedAt": "2026-08-21T10:00:00.000Z"
  }
}
```

---

### 6.4 Update User Profile

**Endpoint**

```text
PATCH /api/v2/users/profile
```

**Authentication**

Required.

**Request Body**

```json
{
  "username": "amir_sim"
}
```

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "username": "amir_sim",
    "email": "amir@example.com",
    "updatedAt": "2026-08-21T12:00:00.000Z"
  }
}
```

---

## 7. Account Management

### 7.1 Edit Account

**Endpoint**

```text
PATCH /api/v2/users/accounts/:accountId
```

**Authentication**

Required.

**Path Parameter**

```text
accountId: number
```

**Request Body**

```json
{
  "name": "HBL Current Account",
  "type": "BANK",
  "provider": "HBL"
}
```

All fields are optional because this is a partial update.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Account updated successfully",
  "data": {
    "id": 1,
    "name": "HBL Current Account",
    "type": "BANK",
    "provider": "HBL",
    "updatedAt": "2026-08-21T12:00:00.000Z"
  }
}
```

---

### 7.2 Delete Account

**Endpoint**

```text
DELETE /api/v2/users/accounts/:accountId
```

**Authentication**

Required.

**Path Parameter**

```text
accountId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Account deleted successfully",
  "data": null
}
```

An account must only be deleted according to the application's transaction-retention rules. Existing transactions should not be accidentally removed just because an account is deleted.

---

## 8. Category Management

### 8.1 Edit Category

**Endpoint**

```text
PATCH /api/v2/users/categories/:categoryId
```

**Authentication**

Required.

**Path Parameter**

```text
categoryId: number
```

**Request Body**

```json
{
  "name": "Groceries",
  "description": "Food and grocery expenses"
}
```

All fields are optional because this is a partial update.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Category updated successfully",
  "data": {
    "id": 1,
    "name": "Groceries",
    "description": "Food and grocery expenses",
    "updatedAt": "2026-08-21T12:00:00.000Z"
  }
}
```

---

### 8.2 Delete Category

**Endpoint**

```text
DELETE /api/v2/users/categories/:categoryId
```

**Authentication**

Required.

**Path Parameter**

```text
categoryId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Category deleted successfully",
  "data": null
}
```

Existing transaction references must be handled according to the application's category-retention rules.

---

## 9. Transaction Filtering

Transaction filtering uses the existing transaction collection endpoint rather than creating a separate endpoint for each filter.

### 9.1 Filter Transactions by Account

**Endpoint**

```text
GET /api/v2/users/transactions?accountId=2
```

**Authentication**

Required.

**Query Parameter**

```text
accountId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping"
    }
  ]
}
```

---

### 9.2 Filter Transactions by Category

**Endpoint**

```text
GET /api/v2/users/transactions?categoryId=1
```

**Authentication**

Required.

**Query Parameter**

```text
categoryId: number
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping"
    }
  ]
}
```

---

### 9.3 Filter Transactions by Type

**Endpoint**

```text
GET /api/v2/users/transactions?transactionType=EXPENSE
```

**Authentication**

Required.

**Query Parameter**

```text
transactionType: INCOME | EXPENSE
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping"
    }
  ]
}
```

---

### 9.4 Filter Transactions by Date

**Endpoint**

```text
GET /api/v2/users/transactions?startDate=2026-08-01&endDate=2026-08-31
```

**Authentication**

Required.

**Query Parameters**

```text
startDate: date
endDate: date
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping"
    }
  ]
}
```

---

### 9.5 Combine Transaction Filters

Multiple query parameters can be used together.

**Endpoint**

```text
GET /api/v2/users/transactions?accountId=2&categoryId=1&transactionType=EXPENSE&startDate=2026-08-01&endDate=2026-08-31
```

**Authentication**

Required.

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "amount": 1500,
      "transactionType": "EXPENSE",
      "categoryId": 1,
      "accountId": 2,
      "transactionDate": "2026-08-21T10:00:00.000Z",
      "description": "Grocery shopping"
    }
  ]
}
```

---

## 10. Reports

### 10.1 Monthly Income

**Endpoint**

```text
GET /api/v2/users/reports/income?year=2026&month=8
```

**Authentication**

Required.

**Query Parameters**

```text
year: number
month: number (1-12)
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Monthly income retrieved successfully",
  "data": {
    "year": 2026,
    "month": 8,
    "totalIncome": 120000
  }
}
```

---

### 10.2 Monthly Expenses

**Endpoint**

```text
GET /api/v2/users/reports/expenses?year=2026&month=8
```

**Authentication**

Required.

**Query Parameters**

```text
year: number
month: number (1-12)
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Monthly expenses retrieved successfully",
  "data": {
    "year": 2026,
    "month": 8,
    "totalExpenses": 35000
  }
}
```

---

### 10.3 Expenses by Category

**Endpoint**

```text
GET /api/v2/users/reports/expenses/categories?year=2026&month=8
```

**Authentication**

Required.

**Query Parameters**

```text
year: number
month: number (1-12)
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Category expenses retrieved successfully",
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Food",
      "totalExpenses": 15000
    },
    {
      "categoryId": 2,
      "categoryName": "Transport",
      "totalExpenses": 8000
    }
  ]
}
```

---

### 10.4 Category Summaries

**Endpoint**

```text
GET /api/v2/users/reports/categories?year=2026&month=8
```

**Authentication**

Required.

**Query Parameters**

```text
year: number
month: number (1-12)
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Category summary retrieved successfully",
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Food",
      "income": 0,
      "expenses": 15000,
      "transactionCount": 12
    },
    {
      "categoryId": 2,
      "categoryName": "Transport",
      "income": 0,
      "expenses": 8000,
      "transactionCount": 7
    }
  ]
}
```

---

### 10.5 Account Activity

**Endpoint**

```text
GET /api/v2/users/reports/accounts/:accountId?startDate=2026-08-01&endDate=2026-08-31
```

**Authentication**

Required.

**Path Parameter**

```text
accountId: number
```

**Query Parameters**

```text
startDate: date
endDate: date
```

**Request Body**

No request body.

**Response — 200 OK**

```json
{
  "statusCode": 200,
  "message": "Account activity retrieved successfully",
  "data": {
    "accountId": 2,
    "accountName": "Cash",
    "totalIncome": 30000,
    "totalExpenses": 12000,
    "transactionCount": 15,
    "transactions": [
      {
        "id": 1,
        "amount": 1500,
        "transactionType": "EXPENSE",
        "categoryId": 1,
        "accountId": 2,
        "transactionDate": "2026-08-21T10:00:00.000Z",
        "description": "Grocery shopping"
      }
    ]
  }
}
```

---

# Endpoint Summary

## Version 1

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/users/auth/signup` | Sign up |
| POST | `/api/v1/users/auth/login` | Login |
| POST | `/api/v1/users/auth/logout` | Logout |
| POST | `/api/v1/users/accounts` | Create account |
| GET | `/api/v1/users/accounts` | View accounts |
| GET | `/api/v1/users/accounts/:accountId` | View account details |
| POST | `/api/v1/users/categories` | Create category |
| GET | `/api/v1/users/categories` | View categories |
| POST | `/api/v1/users/transactions` | Create transaction |
| GET | `/api/v1/users/transactions` | View transactions |
| GET | `/api/v1/users/transactions/:transactionId` | View transaction details |
| PATCH | `/api/v1/users/transactions/:transactionId` | Edit transaction |
| DELETE | `/api/v1/users/transactions/:transactionId` | Delete transaction |
| GET | `/api/v1/users/dashboard` | View dashboard |

## Version 2

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v2/users/auth/forgot-password` | Request password reset |
| POST | `/api/v2/users/auth/reset-password` | Reset password |
| GET | `/api/v2/users/profile` | View profile |
| PATCH | `/api/v2/users/profile` | Update profile |
| PATCH | `/api/v2/users/accounts/:accountId` | Edit account |
| DELETE | `/api/v2/users/accounts/:accountId` | Delete account |
| PATCH | `/api/v2/users/categories/:categoryId` | Edit category |
| DELETE | `/api/v2/users/categories/:categoryId` | Delete category |
| GET | `/api/v2/users/transactions?accountId=` | Filter by account |
| GET | `/api/v2/users/transactions?categoryId=` | Filter by category |
| GET | `/api/v2/users/transactions?transactionType=` | Filter by type |
| GET | `/api/v2/users/transactions?startDate=&endDate=` | Filter by date |
| GET | `/api/v2/users/reports/income` | Monthly income |
| GET | `/api/v2/users/reports/expenses` | Monthly expenses |
| GET | `/api/v2/users/reports/expenses/categories` | Expenses by category |
| GET | `/api/v2/users/reports/categories` | Category summaries |
| GET | `/api/v2/users/reports/accounts/:accountId` | Account activity |

---

# Important API Rules

1. `userId` is never accepted from the client for user-owned resources.
2. The authenticated user's ID is taken from the access token.
3. A transaction's `accountId` must belong to the authenticated user.
4. A transaction's `categoryId` must belong to the authenticated user.
5. A transaction must always have an account and category.
6. `transactionType` can only be `INCOME` or `EXPENSE` in Version 1.
7. Category names are unique per user.
8. Account names are unique per user.
9. User ownership must be checked before returning, updating, or deleting an account, category, or transaction.
10. Passwords, access tokens, refresh tokens, and password-reset tokens must never be returned in ordinary resource responses.
11. The API should return HTTP status codes through the actual HTTP response status, while `statusCode` in the response body mirrors that status for a consistent API contract.
