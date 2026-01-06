A full-stack mini Inventory & Orders Management application built with React (frontend) and Node.js + Express (backend).

The app supports product management, order creation, stock handling, and order cancellation with proper business rules.

--------------------------------------------

Products Features:

Create product with validation

Unique SKU enforcement

View all products

Search products by name or SKU

Filter products by minimum stock

Update product (name, price, stock)

Delete product (restricted if used in any order)

---------------------------------------------------

Orders Feature:

Create order with multiple items

Live total calculation before submit

Automatic stock deduction on order creation

Prevent order creation if stock is insufficient

View all orders

View order details

Cancel order (only once)

Restore stock on order cancellation

----------------------------------------------

Tech Stack:

Frontend:--------------------

React (Functional Components + Hooks)

React Router DOM

Axios

Backend:----------------------

Node.js

Express.js

JSON file storage (persistent)

REST APIs

----------------------------------

📂 Project Structure
root/
├── server/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── data/
│   │   ├── products.json
│   │   └── orders.json
│   ├── utils/
│   └── app.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

-------------------------------------

How to Run the Project:

Backend Setup:

cd server
npm install
npm run dev

Backend runs on:

http://localhost:5000

---------------------------------

Frontend Setup:

cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173

----------------------------------

API Endpoints:

Products:

POST /api/products – Create product

GET /api/products – List products (supports search & minStock)

PUT /api/products/:id – Update product

DELETE /api/products/:id – Delete product (fails if used in order)

------------------------------------

Orders:

POST /api/orders – Create order

GET /api/orders – List orders

PUT /api/orders/:id/cancel – Cancel order