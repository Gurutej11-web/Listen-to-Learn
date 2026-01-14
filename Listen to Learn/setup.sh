#!/bin/bash
# Listen to Learn - Quick Setup Script
# Run this after cloning to get started quickly

echo "🎧📘 Listen to Learn Setup"
echo "=========================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "📝 Next steps:"
echo ""
echo "1. Create a Firebase project:"
echo "   - Go to https://console.firebase.google.com/"
echo "   - Create a new project"
echo "   - Enable Authentication, Firestore, Storage"
echo ""
echo "2. Get your Firebase config:"
echo "   - Go to Project Settings"
echo "   - Copy your Web SDK configuration"
echo ""
echo "3. Update your credentials:"
echo "   - Edit public/js/firebase-config.js"
echo "   - Paste your Firebase config"
echo ""
echo "4. Run locally:"
echo "   - firebase serve"
echo "   - Open http://localhost:5000"
echo ""
echo "5. Deploy:"
echo "   - firebase deploy"
echo ""
echo "📚 For detailed setup, read SETUP.md"
echo ""
echo "✅ Setup complete! Happy learning! 🚀"
