# 🚀 Baa Wiki Setup Script (PowerShell)
# This script helps set up the baa-wiki repository for the first time

Write-Host "🚀 Setting up Baa Wiki..." -ForegroundColor Blue
Write-Host "📚 Arabic-First Documentation Site for Baa Programming Language" -ForegroundColor Blue
Write-Host ""

# Function to print colored output
function Print-Status {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Print-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    if ($nodeVersion -match "v(\d+)\.") {
        $majorVersion = [int]$matches[1]
        if ($majorVersion -lt 18) {
            Print-Error "Node.js version 18+ is required. Current version: $nodeVersion"
            exit 1
        }
        Print-Success "Node.js $nodeVersion detected"
    }
} catch {
    Print-Error "Node.js is not installed. Please install Node.js 18+ first."
    Write-Host "Visit: https://nodejs.org/" -ForegroundColor Blue
    exit 1
}

# Check if npm is available
try {
    npm --version | Out-Null
} catch {
    Print-Error "npm is not available. Please install npm."
    exit 1
}

# Install dependencies
Print-Status "Installing dependencies..."
try {
    npm install
    Print-Success "Dependencies installed successfully"
} catch {
    Print-Error "Failed to install dependencies"
    exit 1
}

# Create necessary directories if they don't exist
Print-Status "Creating directory structure..."

$directories = @("docs", ".vitepress\scripts", "public")
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Print-Success "Directory structure created"

# Configure repository settings
Print-Status "Configuring repository settings..."

# Function to prompt for GitHub username
function Get-GitHubUsername {
    $username = Read-Host "🔗 Enter your GitHub username (or organization)"
    if ([string]::IsNullOrWhiteSpace($username)) {
        Print-Warning "No username provided. You'll need to update this manually later."
        return "OmarAglan"
    }
    return $username
}

# Get GitHub username
$githubUsername = Get-GitHubUsername

# Update files with actual GitHub username
if ($githubUsername -ne "OmarAglan") {
    Print-Status "Updating configuration files..."
    
    $filesToUpdate = @(
        ".vitepress\config.js",
        ".github\workflows\sync-docs.yml",
        "README.md",
        "index.md",
        "package.json"
    )
    
    foreach ($file in $filesToUpdate) {
        if (Test-Path $file) {
            (Get-Content $file) -replace "OmarAglan", $githubUsername | Set-Content $file
        }
    }
    
    Print-Success "Configuration updated for GitHub user: $githubUsername"
}

# Test build
Print-Status "Testing build process..."
try {
    npm run build
    Print-Success "Build test successful"
} catch {
    Print-Warning "Build test failed. You may need to sync documentation first."
}

# Instructions
Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1️⃣  Push this repository to GitHub" -ForegroundColor White
Write-Host "2️⃣  Enable GitHub Pages in repository settings" -ForegroundColor White
Write-Host "3️⃣  Set up repository secrets for automated sync (if needed)" -ForegroundColor White
Write-Host "4️⃣  Run your first documentation sync" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start development server:" -ForegroundColor Blue
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "🏗️  To build for production:" -ForegroundColor Blue
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 For more information, see README.md" -ForegroundColor Blue
Write-Host ""
Print-Success "Baa Wiki is ready! صُنع بـ ❤️ للمجتمع العربي المطور"
