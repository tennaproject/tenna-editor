#!/bin/bash

set -e 

echo "Setting up Tenna Editor development environment..."

cd /workspaces/tenna-editor

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

echo "Installing dependencies..."
npm ci

echo ""
echo "Setup completed successfully!"
echo ""
echo "️Available commands:"
echo "  npm run dev      - Start development server"
echo "  npm run build    - Build for production"
echo "  npm run lint     - Run ESLint"
echo "  npm run lint:fix - Fix ESLint issues"
echo "  npm run format   - Format code with Prettier"
echo "  npm run preview  - Preview production build"
echo ""
