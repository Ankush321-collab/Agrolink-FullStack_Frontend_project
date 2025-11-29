# 🚀 Quick Start Guide - AgroLink Buyer Dashboard

## Prerequisites
- Node.js installed
- All dependencies already installed

## Starting the Application

### Step 1: Start JSON Server (Backend)
Open Terminal 1 and run:
```powershell
npm run server
```
✅ JSON Server will start on http://localhost:3001

### Step 2: Start React App (Frontend)
Open Terminal 2 and run:
```powershell
npm run dev
```
✅ React app will start on http://localhost:5173

## Testing the Buyer Dashboard

### Option 1: Use Demo Account
1. Go to http://localhost:5173/login
2. Use demo credentials:
   - **Email**: `rajesh@example.com`
   - **Password**: `buyer123`
3. Click "Login"

### Option 2: Create New Account
1. Go to http://localhost:5173/login
2. Click "Don't have an account? Register"
3. Fill in the form:
   - Full Name
   - Email Address
   - Password
   - Phone Number
   - Address
4. Click "Register"

## Features to Test

### 1️⃣ Browse Products
- Go to "All Products"
- Try search: "wheat", "rice", "tomato"
- Use filters: Category, Location, Price Range
- Try sorting: Price, Name, Rating
- Toggle Grid/List view

### 2️⃣ Shopping Cart
- Click cart icon on any product card
- Or go to product details and select quantity
- View cart (cart icon in navbar)
- Update quantities with +/- buttons
- Remove items
- See total amount update

### 3️⃣ Place Order
- Add items to cart
- Click "Proceed to Checkout"
- Confirm/edit delivery address
- Click "Place Order"
- Order will be created with "pending" status

### 4️⃣ View Orders
- Click "My Orders" from dashboard
- See all your orders
- Check order status (pending/delivered)
- View order details

### 5️⃣ Manage Profile
- Go to "Profile" from dashboard
- Click "Edit Profile"
- Update name, phone, or address
- Click "Save Changes"

### 6️⃣ Favorites
- Click heart icon on product cards
- View all favorites at "/favorites"
- Remove from favorites by clicking heart again

## Navigation Quick Links

**Public:**
- Home: http://localhost:5173/
- All Products: http://localhost:5173/products
- Login: http://localhost:5173/login

**Buyer (Logged In):**
- Dashboard: http://localhost:5173/buyer-dashboard
- Cart: http://localhost:5173/cart
- Checkout: http://localhost:5173/checkout
- My Orders: http://localhost:5173/my-orders
- Profile: http://localhost:5173/profile
- Favorites: http://localhost:5173/favorites

**Farmer:**
- Add Product: http://localhost:5173/add-product
- Edit Product: http://localhost:5173/edit-product/:id

## Database Info

**Database File**: `db.json`

**Collections:**
- `products` - 10 sample products
- `categories` - 4 categories
- `farmers` - 5 farmers
- `buyers` - 2 demo buyers
- `orders` - 2 sample orders

## Key Features Checklist

✅ Authentication (Login/Register)
✅ Buyer Dashboard with stats
✅ Shopping Cart with quantity management
✅ Checkout process
✅ Order history and tracking
✅ Profile management
✅ Product search & filters
✅ Pagination
✅ Favorites/Wishlist
✅ Farmer profiles
✅ Product ratings & badges
✅ Real-time cart & favorites counters

## Troubleshooting

### JSON Server not starting?
```powershell
# Kill any process on port 3001
netstat -ano | findstr :3001
# Then kill the PID shown
taskkill /PID <PID> /F

# Restart server
npm run server
```

### Cart not updating?
- Check browser console for errors
- Make sure localStorage is enabled
- Try clearing browser cache

### Can't login?
- Ensure JSON Server is running
- Check email/password match
- Use demo account: `rajesh@example.com` / `buyer123`

## Demo Flow

1. **Login** → Use demo account
2. **Browse** → Go to All Products
3. **Search** → Type "rice"
4. **Add to Cart** → Click cart icon
5. **View Cart** → Click cart in navbar
6. **Checkout** → Click "Proceed to Checkout"
7. **Place Order** → Confirm address and submit
8. **View Orders** → See order in My Orders page
9. **Dashboard** → Check stats updated

---

**Enjoy exploring AgroLink! 🌾🛒**
