#!/bin/bash

# Optima Choice - Local Server Starter
# This runs a local server for testing before deploying

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧠 OPTIMA CHOICE - Local Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Starting server..."
echo ""
echo "📱 For testing:"
echo "   Open: http://localhost:8000/optima-qr-code.html"
echo ""
echo "⚠️  For your class (20 students):"
echo "   This local server only works on YOUR network."
echo "   See DEPLOY.md for how to put this online!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Server running... Press Ctrl+C to stop"
echo ""

python3 -m http.server 8000
