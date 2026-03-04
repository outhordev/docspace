---
title: Build Pipeline
order: 2
description: CI/CD setup and deployment process.
---

## Build Pipeline

### Overview

All builds run through **GitHub Actions**. The pipeline supports three environments:

1. **Development** — triggered on PR to `develop`
2. **Staging** — triggered on push to `develop`
3. **Production** — triggered on tag push (`v*`)

### Pipeline Steps

```yaml
name: Build & Deploy
on:
  push:
    tags: ['v*']
    branches: [develop]
  pull_request:
    branches: [develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: game-ci/unity-builder@v4
        with:
          targetPlatform: StandaloneLinux64
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: build/
```

### Build Times

| Target | Avg Time | Notes |
|---|---|---|
| Linux Server | ~8 min | Headless, no GPU required |
| Windows Client | ~12 min | Includes asset bundles |
| WebGL | ~18 min | Compression adds time |

> [!TIP]
> Use Unity's Addressables system to split asset bundles. This keeps the initial download small and loads heavy assets on demand.

### Environment Variables

```bash
# Required for all builds
UNITY_LICENSE=<base64-encoded-license>
UNITY_EMAIL=builder@studio.com
UNITY_PASSWORD=<secret>

# Staging/Production only
DEPLOY_KEY=<ssh-key>
SERVER_HOST=game.example.com
```

> [!WARNING]
> Never commit credentials to the repository. Use GitHub Secrets for all sensitive values.

