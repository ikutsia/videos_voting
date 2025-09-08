# Environment Variables Setup Guide

## 🔐 **Firebase Configuration Security**

To keep your Firebase credentials secure when pushing to GitHub, you need to use environment variables.

## 📋 **Step 1: Create .env file**

Create a file named `.env` in your project root with your Firebase configuration:

```bash
# Firebase Configuration
# Replace these values with your actual Firebase project config
REACT_APP_FIREBASE_API_KEY=AIzaSyDh2Ne22uHzFZGhivi2ZFkE6Eq_TzCQMlo
REACT_APP_FIREBASE_AUTH_DOMAIN=video-voting-7fae4.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=video-voting-7fae4
REACT_APP_FIREBASE_STORAGE_BUCKET=video-voting-7fae4.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=462718520488
REACT_APP_FIREBASE_APP_ID=1:462718520488:web:bb46758249efe9f4b1069d
```

## 📋 **Step 2: Create .env.example file**

Create a file named `.env.example` in your project root (this will be committed to GitHub):

```bash
# Firebase Configuration
# Copy this file to .env and replace with your actual Firebase project config
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## ✅ **What's Already Done:**

1. **Firebase config updated** - `src/firebase/config.js` now uses environment variables
2. **Gitignore updated** - `.env` file is ignored (won't be committed to GitHub)
3. **Security implemented** - Your Firebase credentials are now secure

## 🚀 **Ready for GitHub:**

- ✅ **`.env`** - Contains your real credentials (ignored by Git)
- ✅ **`.env.example`** - Template for others (committed to GitHub)
- ✅ **Firebase config** - Uses environment variables
- ✅ **Gitignore** - Protects your credentials

## 📝 **Manual Steps:**

1. **Create `.env` file** with your Firebase config (above)
2. **Create `.env.example` file** with template (above)
3. **Test the app** - should work exactly the same
4. **Push to GitHub** - credentials are now secure!

Your Firebase configuration is now properly secured for GitHub deployment! 🎉
