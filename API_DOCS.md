# 📘 API Documentation

Base URL:
http://localhost:3000/api

---

## 🔐 Register User

POST /register

Body:
{
  "name": "Siji",
  "email": "siji@test.com",
  "password": "123456",
  "role": "user" || "admin"
}

---

## 🔐 Login

POST /login

Body:
{
  "email": "siji@test.com",
  "password": "123456"
}

Response:
{
  "token": "JWT_TOKEN"
}

---

## 👤 Get Profile (Protected)

GET /profile

Headers:
Authorization: Bearer <token>

---

## 📋 Get All Users

GET /users

---

## ✏️ Update User

PUT /user/:id

Headers:
Authorization: Bearer <token>

Body:
{
  "name": "Updated Name",
  "email": "new@test.com"
}

---

## ❌ Delete User (Admin Only)

DELETE /user/:id

Headers:
Authorization: Bearer <token>

---