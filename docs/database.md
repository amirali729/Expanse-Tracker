# Expense Tracker — Project Planning

## Entities
    - Users
    - Accounts
    - Categories
    - Transactions
    - Budget

### Users
    Attributes
        id: number 
        username: 
        email: 
        password: 
        is_deleted: 
        updatedAt: 
        deletedAt: 
        createdAt: 

### Account
    id
    userId FK → User
    name
    type
    provider
    createdAt
    updatedAt
    deletedAt

    UNIQUE(userId, name)

### Categories
    id
    userId FK → User
    name
    description
    createdAt
    updatedAt
    deletedAt

    UNIQUE(userId, name)

### Transactions
    id
    userId FK → User
    accountId FK → Account
    categoryId FK → Category
    transactionType
    amount
    transactionDate
    description
    createdAt
    updatedAt
    deletedAt

## Relationships:

    User 1:N Account

    User 1:N Category

    User 1:N Transaction

    Account 1:N Transaction

    Category 1:N Transaction
        