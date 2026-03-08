# Dashboard Setup

## 1. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env.local` with your MongoDB URI

## 2. Environment Variables

Update `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_password
```

## 3. Access Dashboard

- Login: `http://localhost:3000/dashboard/login`
- Dashboard: `http://localhost:3000/dashboard`

## 4. Features

- ✅ Hero Section Management
- ✅ Projects CRUD
- ✅ Skills CRUD
- ✅ Authentication
- ✅ Secure API Routes

## 5. Deploy to Vercel

```bash
vercel
```

Add environment variables in Vercel dashboard.
