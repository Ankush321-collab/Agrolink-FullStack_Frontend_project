# AgroLink - Advanced Frontend CRUD Application

AgroLink is a feature-rich React + Tailwind CSS frontend application with full CRUD functionality using Axios and JSON-Server. It allows farmers to list, update, and manage agricultural products while providing buyers with advanced search, filtering, and discovery features through a responsive, modern UI.

## 📸 Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/home-page-screenshot.png)
*Landing page with platform overview and features*

### All Products - Advanced Search & Filter
![All Products](https://github.com/user-attachments/assets/all-products-screenshot.png)
*Product listing with search bar, filters (category, location, price range), sorting, pagination, and grid/list view toggle*

### Favorites Page
![Favorites](https://github.com/user-attachments/assets/favorites-screenshot.png)
*Saved favorite products with persistent storage*

## 🚀 Features

### Core Features
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete agricultural products
- 🎨 **Responsive UI** - Built with Tailwind CSS for a modern, mobile-friendly design
- 🔄 **React Router DOM** - Multi-page navigation with clean routing
- 📡 **Axios Integration** - Seamless API communication with JSON-Server
- 🔔 **Toast Notifications** - User feedback with React Toastify
- 🎯 **Reusable Components** - Modular component architecture

### Advanced Features
- 🔍 **Advanced Search** - Search products by name or description
- 🎚️ **Smart Filtering** - Filter by category, location, and price range
- 📊 **Multi-Sort Options** - Sort by price, name, or rating
- 📄 **Pagination** - Efficient browsing with 6 items per page
- ❤️ **Favorites/Wishlist** - Save favorite products (localStorage)
- ⭐ **Product Ratings** - Display product ratings and reviews
- 🏷️ **Category System** - Organized product categories (Grains, Vegetables, Fruits, Dairy)
- 👨‍🌾 **Farmer Profiles** - Dedicated farmer pages with contact information
- 🌿 **Organic Badges** - Visual indicators for organic products
- 📦 **Stock Status** - Real-time stock availability indicators
- 🎯 **Grid/List View** - Toggle between viewing modes
- 🔢 **Favorites Counter** - Live count in navigation

## 📁 Project Structure

```
agrolink/
│── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   └── Pagination.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AllProducts.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Favorites.jsx
│   │   └── FarmerProfile.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│── db.json
│── package.json
│── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **JSON-Server** - Mock REST API
- **React Icons** - Icon library
- **React Toastify** - Notification system

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## ⚙️ Installation & Setup

1. **Navigate to project directory**
   ```bash
   cd agrolink
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

## 🚀 Running the Application

You need to run **TWO separate terminals**:

### Terminal 1: Start JSON-Server (Backend)

```bash
npm run server
```

This will start the JSON-Server on `http://localhost:3001`

### Terminal 2: Start React App (Frontend)

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 🌐 Available Routes

- `/` - Home page with platform overview
- `/products` - View all agricultural products with search & filter
- `/add-product` - Form to add new product
- `/edit-product/:id` - Form to edit existing product
- `/product/:id` - View detailed information about a product
- `/favorites` - View saved favorite products
- `/farmer/:id` - View farmer profile and their products

## 📡 API Endpoints

The JSON-Server provides the following endpoints:

**Products:**
- `GET http://localhost:3001/products` - Fetch all products
- `GET http://localhost:3001/products/:id` - Fetch single product
- `POST http://localhost:3001/products` - Add new product
- `PUT http://localhost:3001/products/:id` - Update product
- `DELETE http://localhost:3001/products/:id` - Delete product

**Categories:**
- `GET http://localhost:3001/categories` - Fetch all categories

**Farmers:**
- `GET http://localhost:3001/farmers` - Fetch all farmers
- `GET http://localhost:3001/farmers/:id` - Fetch single farmer

## 📊 Database Schema

**Products:**
```json
{
  "id": "1",
  "name": "Wheat",
  "price": 1200,
  "quantity": "50 kg",
  "location": "Nashik",
  "category": "Grains",
  "farmerId": "1",
  "image": "image_url",
  "description": "Product description",
  "rating": 4.5,
  "inStock": true,
  "organic": true
}
```

**Categories:**
```json
{
  "id": "1",
  "name": "Grains",
  "icon": "🌾",
  "description": "Wheat, Rice, and other grains"
}
```

**Farmers:**
```json
{
  "id": "1",
  "name": "Ramesh Patil",
  "location": "Nashik",
  "phone": "+91 9876543210",
  "email": "ramesh.patil@example.com",
  "farmSize": "10 acres",
  "certified": true,
  "specialization": "Organic Farming",
  "avatar": "avatar_url"
}
```

## 🎨 Key Components

### Reusable Components
- **Navbar** - Navigation bar with brand logo, links, and favorites counter
- **ProductCard** - Enhanced product card with ratings, badges, and favorite toggle
- **Button** - Customizable button with multiple variants
- **Modal** - Reusable modal for confirmations
- **SearchBar** - Search input with icon
- **FilterPanel** - Advanced filtering sidebar
- **Pagination** - Page navigation component

### Pages
- **Home** - Landing page with features and about section
- **AllProducts** - Advanced product listing with search, filter, sort, and pagination
- **AddProduct** - Comprehensive form to create new product listing
- **EditProduct** - Form to update existing product
- **ProductDetails** - Full product information with farmer details and actions
- **Favorites** - Saved favorite products page
- **FarmerProfile** - Farmer information and their products

## 🎯 CRUD Operations

### Create (Add Product)
- Navigate to "Add Product" page
- Fill in product details
- Submit form to add to database

### Read (View Products)
- Browse all products on "All Products" page
- Click "View Details" to see full information

### Update (Edit Product)
- Click "Edit" button on product details page
- Modify product information
- Save changes to update database

### Delete (Remove Product)
- Click "Delete" button on product details page
- Confirm deletion in modal
- Product removed from database

## 🎨 Styling

The application uses **Tailwind CSS** for styling with:
- Responsive grid layouts
- Custom color scheme (Green theme for agricultural focus)
- Hover effects and transitions
- Shadow and rounded corners
- Mobile-first responsive design

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop computers

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 📝 Notes

- Make sure JSON-Server is running before using the application
- The database file `db.json` will be automatically updated with changes
- Images are stored as URLs (external links)

## 🤝 Contributing

This is a learning project demonstrating CRUD operations with React and JSON-Server.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a frontend CRUD demonstration project for AgroLink platform.

---

**Happy Coding! 🌾**

