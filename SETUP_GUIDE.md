# Z-APP Setup Guide

## Prerequisites
- Node.js (v20.x or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
The backend `.env` file is already configured with your credentials. Located at `backend/.env`

Key variables:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Backend server port (5001)
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_*`: Image upload credentials
- `ADMIN_EMAIL`: Default admin email
- `EMAIL_*`: Email service credentials for password reset

#### Frontend (.env)
The frontend `.env` files are already created:
- `frontend/.env` - Development environment
- `frontend/.env.production` - Production environment

### 3. Start the Application

#### Option 1: Run Both (Recommended for Development)
```bash
# From root directory
npm run dev
```

#### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Admin Dashboard**: http://localhost:5173/admin (login with admin credentials)

## Default Admin Account

After the backend starts, a default admin account will be created:
- **Email**: ronaldo@gmail.com
- **Username**: admin
- **Password**: safwan123

**⚠️ IMPORTANT**: Change the admin password after first login!

## Features

### ✅ Responsive Design
- Mobile-first approach
- Optimized for phones, tablets, and desktops
- Touch-friendly interface
- Adaptive layouts

### ✅ User Features
- User registration and login
- Email/Username login support
- Profile setup with avatar upload
- Friend system (send/accept/reject requests)
- Real-time messaging
- Image sharing in chats
- Online/offline status
- Stranger chat (Omegle-style)
- Video/audio calls (WebRTC)
- Theme customization (30+ themes)

### ✅ Admin Features
- User management dashboard
- Suspend/unsuspend users
- Block/unblock users
- Delete users
- View and manage reports
- Real-time user monitoring

## Troubleshooting

### Backend won't start
1. Check MongoDB connection string in `backend/.env`
2. Ensure MongoDB is running
3. Check if port 5001 is available

### Frontend won't connect to backend
1. Verify `VITE_API_BASE_URL` in `frontend/.env`
2. Ensure backend is running on port 5001
3. Check browser console for CORS errors

### Images not uploading
1. Verify Cloudinary credentials in `backend/.env`
2. Check Cloudinary dashboard for quota limits

### Email not sending
1. Verify Gmail credentials in `backend/.env`
2. Enable "Less secure app access" or use App Password
3. Check Gmail account settings

## Production Deployment

### Backend (Render/Heroku)
1. Set environment variables in hosting platform
2. Update `FRONTEND_URL` to your frontend domain
3. Ensure MongoDB Atlas is accessible

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Set `VITE_API_BASE_URL` to your backend URL
3. Deploy the `dist` folder

## Project Structure

```
z.om/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   ├── lib/            # Utilities (socket, db, cloudinary)
│   │   └── index.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   ├── lib/            # Utilities
│   │   └── App.jsx         # Main app component
│   └── package.json
└── package.json            # Root package
```

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (real-time)
- JWT (authentication)
- Cloudinary (image storage)
- Nodemailer (emails)

### Frontend
- React 18
- Vite
- TailwindCSS + DaisyUI
- Zustand (state management)
- Socket.IO Client
- Axios
- React Router

## Support

For issues or questions, check:
1. Console logs (browser & terminal)
2. Network tab in browser DevTools
3. MongoDB connection status
4. Environment variables

## Security Notes

⚠️ **Before deploying to production:**
1. Change all default passwords
2. Use strong JWT_SECRET
3. Enable HTTPS
4. Set secure CORS origins
5. Review and update admin credentials
6. Enable rate limiting
7. Add input validation
8. Sanitize user inputs
