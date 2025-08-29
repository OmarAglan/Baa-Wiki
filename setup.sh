#!/bin/bash

# 🚀 Baa Wiki Setup Script
# This script helps set up the baa-wiki repository for the first time

echo "🚀 Setting up Baa Wiki..."
echo "📚 Arabic-First Documentation Site for Baa Programming Language"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)

if [ "$MAJOR_VERSION" -lt "18" ]; then
    print_error "Node.js version 18+ is required. Current version: v$NODE_VERSION"
    exit 1
fi

print_success "Node.js v$NODE_VERSION detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not available. Please install npm."
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create necessary directories if they don't exist
print_status "Creating directory structure..."

mkdir -p docs
mkdir -p .vitepress/scripts
mkdir -p public

print_success "Directory structure created"

# Set up Git hooks (optional)
if [ -d ".git" ]; then
    print_status "Setting up Git hooks..."
    
    # Create pre-commit hook to ensure builds work
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Running pre-commit checks..."

# Check if build works
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors before committing."
    exit 1
fi
EOF

    chmod +x .git/hooks/pre-commit
    print_success "Git hooks configured"
fi

# Update placeholders in files
print_status "Configuring repository settings..."

# Function to prompt for GitHub username
get_github_username() {
    read -p "🔗 Enter your GitHub username (or organization): " GITHUB_USERNAME
    if [ -z "$GITHUB_USERNAME" ]; then
        print_warning "No username provided. You'll need to update this manually later."
        GITHUB_USERNAME="OmarAglan"
    fi
}

# Get GitHub username
get_github_username

# Update files with actual GitHub username
if [ "$GITHUB_USERNAME" != "OmarAglan" ]; then
    print_status "Updating configuration files..."
    
    # Update files (compatible with both GNU sed and BSD sed)
    if sed --version >/dev/null 2>&1; then
        # GNU sed
        sed -i "s/OmarAglan/$GITHUB_USERNAME/g" .vitepress/config.js
        sed -i "s/OmarAglan/$GITHUB_USERNAME/g" .github/workflows/sync-docs.yml
        sed -i "s/OmarAglan/$GITHUB_USERNAME/g" README.md
        sed -i "s/OmarAglan/$GITHUB_USERNAME/g" index.md
        sed -i "s/OmarAglan/$GITHUB_USERNAME/g" package.json
    else
        # BSD sed (macOS)
        sed -i '' "s/OmarAglan/$GITHUB_USERNAME/g" .vitepress/config.js
        sed -i '' "s/OmarAglan/$GITHUB_USERNAME/g" .github/workflows/sync-docs.yml
        sed -i '' "s/OmarAglan/$GITHUB_USERNAME/g" README.md
        sed -i '' "s/OmarAglan/$GITHUB_USERNAME/g" index.md
        sed -i '' "s/OmarAglan/$GITHUB_USERNAME/g" package.json
    fi
    
    print_success "Configuration updated for GitHub user: $GITHUB_USERNAME"
fi

# Test build
print_status "Testing build process..."
if npm run build; then
    print_success "Build test successful"
else
    print_warning "Build test failed. You may need to sync documentation first."
fi

# Instructions
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1️⃣  Push this repository to GitHub"
echo "2️⃣  Enable GitHub Pages in repository settings"
echo "3️⃣  Set up repository secrets for automated sync (if needed)"
echo "4️⃣  Run your first documentation sync"
echo ""
echo "🚀 To start development server:"
echo "   npm run dev"
echo ""
echo "🏗️  To build for production:"
echo "   npm run build"
echo ""
echo "📚 For more information, see README.md"
echo ""
print_success "Baa Wiki is ready! صُنع بـ ❤️ للمجتمع العربي المطور"
