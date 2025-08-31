#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📚 Processing documentation...');

// Configuration
const DOCS_DIR = path.join(process.cwd(), 'docs');
const CONFIG = {
  arabicFirst: true,
  generateIndex: true,
  processMarkdown: true
};

// Process all markdown files
function processMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      processMarkdownFile(filePath);
    }
  });
}

// Process individual markdown file
function processMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add RTL markers for Arabic content
  if (CONFIG.arabicFirst) {
    content = addRTLMarkers(content);
  }
  
  // Process Baa code blocks
  content = processBaaCodeBlocks(content);
  
  // Update relative links
  content = updateRelativeLinks(content, filePath);
  
  fs.writeFileSync(filePath, content);
  console.log(`  ✓ Processed: ${path.relative(DOCS_DIR, filePath)}`);
}

// Add RTL markers for better Arabic display
function addRTLMarkers(content) {
  // Add RTL markers to Arabic headings
  content = content.replace(/^(#+)\s*([\u0600-\u06FF])/gm, '$1 <div dir="rtl">$2');
  content = content.replace(/^([\u0600-\u06FF].*)$/gm, (match) => {
    if (!match.startsWith('#') && !match.startsWith('<')) {
      return match + '</div>';
    }
    return match;
  });
  
  return content;
}

// Process Baa code blocks for proper highlighting
function processBaaCodeBlocks(content) {
  return content.replace(/```baa\n([\s\S]*?)```/g, (match, code) => {
    // Add language hints for better syntax highlighting
    return '```baa\n' + code + '\n```';
  });
}

// Update relative links to work with VitePress
function updateRelativeLinks(content, filePath) {
  const dir = path.dirname(filePath);
  
  // Update relative markdown links
  content = content.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (match, text, link) => {
    if (!link.startsWith('http') && !link.startsWith('/')) {
      // Convert to absolute path from docs root
      const absolutePath = path.relative(DOCS_DIR, path.join(dir, link));
      return `[${text}](/${absolutePath.replace(/\\/g, '/').replace('.md', '')})`;
    }
    return match;
  });
  
  return content;
}

// Generate index file if it doesn't exist
function generateIndexFile() {
  const indexPath = path.join(DOCS_DIR, 'index.md');
  
  if (!fs.existsSync(indexPath)) {
    const indexContent = `---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: لغة باء
  text: Baa Programming Language
  tagline: لغة برمجة عربية حديثة وسريعة
  actions:
    - theme: brand
      text: البداية السريعة
      link: /00_نظرة_عامة/البداية_السريعة
    - theme: alt
      text: مواصفات اللغة
      link: /01_مواصفات_اللغة/

features:
  - title: عربية أصيلة
    details: مصممة من الأساس لدعم اللغة العربية بشكل كامل
  - title: أداء عالي
    details: مترجم محسّن ينتج كود آلة سريع
  - title: حديثة وآمنة
    details: نظام أنواع قوي وإدارة ذاكرة آمنة
---`;
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('  ✓ Generated index.md');
  }
}

// Main execution
try {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ Docs directory not found!');
    process.exit(1);
  }
  
  processMarkdownFiles(DOCS_DIR);
  
  if (CONFIG.generateIndex) {
    generateIndexFile();
  }
  
  console.log('✅ Documentation processing completed!');
} catch (error) {
  console.error('❌ Error processing documentation:', error);
  process.exit(1);
}
