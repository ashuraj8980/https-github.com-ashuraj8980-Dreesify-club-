# 🔥 Dreesify Club — Firebase Setup Guide

## ✅ What's Fixed

1. **firestore.rules** — Orders collection added, proper security rules
2. **storage.rules** — Admin-only product uploads, user photo uploads
3. **CartContext.tsx** — Added `total`, `clearCart`, localStorage persistence
4. **AuthContext.tsx** — User auto-saved to Firestore on login/signup
5. **firebase/config.ts** — Env vars support + duplicate init prevention
6. **firebase/index.ts** — Clean exports
7. **AdminPage.tsx** — Missing Truck, ShieldCheck, ArrowRight imports fixed
8. **CheckoutPage.tsx** — ArrowRight import fixed, Razorpay uses env var

---

## 🚀 Firebase Console Setup Steps

### Step 1: Enable Authentication
1. Go to Firebase Console → Your Project → Authentication
2. Click "Get Started"
3. Enable these providers:
   - ✅ **Email/Password**
   - ✅ **Google**
4. For Google: add your domain in "Authorized domains"
   - Add: `localhost`
   - Add: your Vercel URL (e.g. `dreesify-club.vercel.app`)

### Step 2: Create Firestore Database
1. Firebase Console → Firestore Database → Create Database
2. Choose: **Production mode** (rules already set)
3. Choose region: `asia-south1` (Mumbai — best for India)
4. Click Enable

### Step 3: Deploy Firestore Rules
Run this command in your project folder:
```bash
firebase deploy --only firestore:rules
```
Or manually paste `firestore.rules` content in Firebase Console → Firestore → Rules tab

### Step 4: Setup Firebase Storage
1. Firebase Console → Storage → Get Started
2. Start in production mode
3. Deploy storage rules:
```bash
firebase deploy --only storage
```

### Step 5: Razorpay Setup
1. Go to https://razorpay.com → Dashboard → Settings → API Keys
2. Generate Test Key (for testing) or Live Key (for real payments)
3. Copy the **Key ID** (starts with `rzp_test_` or `rzp_live_`)

---

## 🌐 Vercel Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | AIzaSyCjRSpDtLxe8zDd9uqN64WSUVaVTfrmhe0 |
| `VITE_FIREBASE_AUTH_DOMAIN` | ashu-7d0cd.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | ashu-7d0cd |
| `VITE_FIREBASE_STORAGE_BUCKET` | ashu-7d0cd.firebasestorage.app |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 843418580808 |
| `VITE_FIREBASE_APP_ID` | 1:843418580808:web:d1128486fd5003d307257d |
| `VITE_FIREBASE_MEASUREMENT_ID` | G-43HWGRGYX2 |
| `VITE_RAZORPAY_KEY_ID` | rzp_live_your_key_here |

---

## 👤 Admin Access

These emails have full admin access (can add/edit/delete products):
- `sanachauhan393@gmail.com`
- `ashukumar8076801908@gmail.com`

To add more admins, edit `OWNER_EMAILS` array in:
- `src/context/AuthContext.tsx`
- `firestore.rules` (isAdmin function)

---

## 📦 Firestore Collections Structure

```
/products/{productId}     — Product catalog (admin writes, all read)
/orders/{orderId}         — Customer orders (user creates, admin manages)  
/users/{userId}           — User profiles (auto-created on signup)
/stats/global             — Dashboard stats (admin only)
```

---

## ⚡ Local Development

```bash
npm install
npm run dev
```

App runs at: http://localhost:3000
