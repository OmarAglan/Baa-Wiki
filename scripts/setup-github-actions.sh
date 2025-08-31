#!/bin/bash

# GitHub Actions Setup Script for Baa Language Documentation
# This script helps set up the repository for GitHub Actions

set -e

echo "🚀 Setting up GitHub Actions for Baa Language Documentation"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please run this script from the repository root."
    exit 1
fi

print_status "Git repository detected"

# Check if GitHub Actions workflows exist
if [ ! -d ".github/workflows" ]; then
    print_error "GitHub Actions workflows not found. Please ensure .github/workflows/ directory exists."
    exit 1
fi

print_status "GitHub Actions workflows found"

# Check required files
required_files=(
    "package.json"
    ".vitepress/config.js"
    "index.md"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Required file not found: $file"
        exit 1
    fi
done

print_status "All required files found"

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or later is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js version $(node --version) is compatible"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_status "npm is available"

# Check if VitePress is installed
if ! npm list vitepress &> /dev/null; then
    print_warning "VitePress not found in dependencies. Installing..."
    npm install vitepress
fi

print_status "VitePress is available"

# Test build
print_info "Testing build process..."
if npm run build; then
    print_status "Build test successful"
else
    print_error "Build test failed. Please fix build issues before setting up GitHub Actions."
    exit 1
fi

# Check if dist folder was created
if [ ! -d ".vitepress/dist" ]; then
    print_error "Build did not create .vitepress/dist folder"
    exit 1
fi

print_status "Build output verified"

# Check repository settings
print_info "Checking repository configuration..."

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
if [[ $REPO_URL == *"github.com"* ]]; then
    print_status "GitHub repository detected"
else
    print_warning "Not a GitHub repository. Some features may not work."
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
print_info "Current branch: $CURRENT_BRANCH"

if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
    print_warning "You're not on main/master branch. GitHub Actions may not trigger correctly."
fi

# Check for required secrets
print_info "Checking for required secrets..."

# Note: We can't actually check secrets from CLI, so we'll provide instructions
print_warning "Please ensure the following secrets are set in your GitHub repository:"
echo "  1. SYNC_TOKEN: Personal Access Token with repo access"
echo "     - Go to Settings → Secrets and variables → Actions"
echo "     - Add new repository secret"
echo "     - Name: SYNC_TOKEN"
echo "     - Value: Your GitHub Personal Access Token"

# Check repository settings
print_info "Repository settings to verify:"
echo "  1. GitHub Pages: Settings → Pages → Source: GitHub Actions"
echo "  2. Actions: Settings → Actions → General → Allow all actions"
echo "  3. Default branch: Settings → General → Default branch (should be main or master)"

# Test workflows
print_info "Testing workflow files..."

# Check YAML syntax for workflow files
for workflow in .github/workflows/*.yml; do
    if [ -f "$workflow" ]; then
        if python3 -c "import yaml; yaml.safe_load(open('$workflow'))" 2>/dev/null; then
            print_status "Workflow syntax valid: $(basename "$workflow")"
        else
            print_error "Workflow syntax invalid: $(basename "$workflow")"
        fi
    fi
done

# Create a test commit to trigger workflows
print_info "Setup complete! To test GitHub Actions:"
echo "  1. Commit and push your changes:"
echo "     git add ."
echo "     git commit -m 'Setup GitHub Actions'"
echo "     git push origin $CURRENT_BRANCH"
echo ""
echo "  2. Check the Actions tab in your GitHub repository"
echo "  3. Monitor the workflow runs for any issues"
echo ""
echo "  4. If workflows fail, check the troubleshooting guide:"
echo "     .github/TROUBLESHOOTING.md"

# Optional: Create a test commit
read -p "Would you like to create a test commit to trigger workflows? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Creating test commit..."
    git add .
    git commit -m "🔧 Setup GitHub Actions workflows

- Added deploy workflow
- Added sync-docs workflow  
- Added test workflow
- Added manual deploy workflow
- Added troubleshooting guide

[skip ci]"
    
    print_info "Pushing to trigger workflows..."
    git push origin "$CURRENT_BRANCH"
    
    print_status "Test commit pushed! Check the Actions tab in your repository."
else
    print_info "Skipping test commit. You can create one manually when ready."
fi

echo ""
print_status "GitHub Actions setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Set up required secrets in repository settings"
echo "  2. Enable GitHub Pages (if not already enabled)"
echo "  3. Test workflows by pushing changes"
echo "  4. Monitor workflow runs in the Actions tab"
echo ""
echo "📚 For help, see: .github/TROUBLESHOOTING.md"