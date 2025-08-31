# 🔧 GitHub Actions Troubleshooting Guide

This guide helps you diagnose and fix common issues with the GitHub Actions workflows in this repository.

## 🚨 Common Issues & Solutions

### 1. **Workflow Not Triggering**

#### Problem: Workflow doesn't run on push/PR
**Symptoms:**
- No workflow runs appear in Actions tab
- No build/deployment happens

**Solutions:**
1. **Check branch name**: Ensure you're pushing to `main` or `master`
2. **Check file paths**: Workflows ignore changes to certain files:
   ```yaml
   paths-ignore:
     - '.github/workflows/sync-docs.yml'
     - 'README.md'
     - 'IMPROVEMENTS.md'
   ```
3. **Check workflow file syntax**: Ensure YAML is valid
4. **Check repository permissions**: Ensure Actions are enabled in repository settings

#### Problem: Manual workflow dispatch not working
**Solutions:**
1. Go to Actions tab → Select workflow → "Run workflow"
2. Check if you have permission to run workflows
3. Ensure workflow file is in `.github/workflows/` directory

### 2. **Build Failures**

#### Problem: Node.js version issues
**Error:** `Node.js version not found` or similar
**Solutions:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'  # Ensure this matches your local version
    cache: 'npm'
```

#### Problem: VitePress build fails
**Error:** `Build failed: .vitepress/dist not found`
**Solutions:**
1. **Check VitePress version**: Ensure it's compatible
2. **Check configuration**: Validate `.vitepress/config.js`
3. **Check dependencies**: Ensure all required packages are installed
4. **Check for syntax errors**: Look for JavaScript/Vue errors

#### Problem: Dependencies installation fails
**Error:** `npm ci` fails
**Solutions:**
1. **Clear cache**: Add `npm cache clean --force` before `npm ci`
2. **Check package-lock.json**: Ensure it's up to date
3. **Check Node.js version**: Ensure compatibility
4. **Check network**: Sometimes npm registry issues occur

### 3. **Deployment Issues**

#### Problem: GitHub Pages deployment fails
**Error:** `Deploy to GitHub Pages` step fails
**Solutions:**
1. **Check permissions**: Ensure workflow has `pages: write` permission
2. **Check repository settings**: Enable GitHub Pages in repository settings
3. **Check branch**: Ensure deploying to correct branch
4. **Check build output**: Ensure `.vitepress/dist` exists and has content

#### Problem: Pages not updating
**Solutions:**
1. **Check deployment status**: Look in Actions tab for deployment job
2. **Check cache**: GitHub Pages may cache content
3. **Check branch**: Ensure deploying to correct branch
4. **Check URL**: Ensure accessing correct URL

### 4. **Sync Issues**

#### Problem: Documentation sync fails
**Error:** `No docs folder found in main repo`
**Solutions:**
1. **Check main repository**: Ensure `Baa` repository exists and has `docs/` folder
2. **Check token**: Ensure `SYNC_TOKEN` secret is set correctly
3. **Check permissions**: Token needs access to both repositories
4. **Check branch**: Ensure syncing from correct branch

#### Problem: Sync token issues
**Error:** `Authentication failed` or `Permission denied`
**Solutions:**
1. **Create new token**: Generate new Personal Access Token
2. **Set permissions**: Token needs `repo` scope
3. **Add to secrets**: Add as `SYNC_TOKEN` in repository secrets
4. **Check repository access**: Ensure token has access to both repos

### 5. **Permission Issues**

#### Problem: Workflow lacks permissions
**Error:** `Resource not accessible by integration`
**Solutions:**
1. **Check workflow permissions**: Ensure correct permissions are set:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
     pull-requests: write
   ```
2. **Check repository settings**: Ensure Actions can write to repository
3. **Check organization settings**: If in organization, check org-level permissions

## 🔍 Debugging Steps

### 1. **Check Workflow Logs**
1. Go to Actions tab
2. Click on failed workflow run
3. Click on failed job
4. Click on failed step
5. Look for error messages and stack traces

### 2. **Enable Debug Logging**
Add this secret to your repository:
- Name: `ACTIONS_STEP_DEBUG`
- Value: `true`

This will show detailed debug information in workflow logs.

### 3. **Test Locally**
Before pushing, test locally:
```bash
# Install dependencies
npm ci

# Test build
npm run build

# Check if dist folder exists
ls -la .vitepress/dist/
```

### 4. **Check Repository Settings**
1. **Actions**: Ensure Actions are enabled
2. **Pages**: Ensure GitHub Pages is enabled
3. **Secrets**: Check if required secrets are set
4. **Branches**: Ensure correct default branch

## 🛠️ Manual Fixes

### 1. **Force Rebuild**
If build is stuck or corrupted:
1. Go to Actions → Manual Deploy
2. Set "Force rebuild" to true
3. Run workflow

### 2. **Skip Tests**
If tests are failing but build works:
1. Go to Actions → Manual Deploy
2. Set "Skip tests" to true
3. Run workflow

### 3. **Manual Sync**
If automatic sync fails:
1. Go to Actions → Sync Documentation
2. Set "Force sync" to true
3. Run workflow

### 4. **Clear Cache**
If cache issues occur:
```bash
# In workflow, add before npm ci:
npm cache clean --force
```

## 📋 Checklist for New Issues

Before reporting an issue, check:

- [ ] Workflow file syntax is valid YAML
- [ ] All required secrets are set
- [ ] Repository permissions are correct
- [ ] Branch names match workflow configuration
- [ ] Dependencies are up to date
- [ ] Local build works
- [ ] No syntax errors in code
- [ ] GitHub Pages is enabled
- [ ] Actions are enabled

## 🆘 Getting Help

If you're still having issues:

1. **Check existing issues**: Look for similar problems in Issues tab
2. **Create detailed issue**: Include:
   - Workflow run URL
   - Error messages
   - Steps to reproduce
   - Expected vs actual behavior
3. **Provide context**: Include repository settings, branch names, etc.

## 🔄 Workflow Dependencies

### Required Secrets:
- `SYNC_TOKEN`: Personal Access Token with repo access

### Required Settings:
- GitHub Pages enabled
- Actions enabled
- Correct default branch (main/master)

### Required Files:
- `package.json` with VitePress dependency
- `.vitepress/config.js`
- `index.md` (homepage)
- `docs/` directory (documentation)

## 📊 Monitoring

### Key Metrics to Watch:
- **Build time**: Should be under 5 minutes
- **Build size**: Should be reasonable (< 50MB)
- **Success rate**: Should be > 95%
- **Deployment time**: Should be under 2 minutes

### Alerts:
- Failed builds
- Failed deployments
- Sync failures
- Permission errors

---

**💡 Tip**: Most issues can be resolved by checking the workflow logs and following the debugging steps above. If you're still stuck, create a detailed issue with all the context you can provide.