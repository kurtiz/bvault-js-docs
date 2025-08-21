---
id: installation-guide
title: Installation Guide
sidebar_position: 1
description: Learn how to install and set up bVault-js in your project
---

# Installation

This guide will help you install and set up bVault-js in your JavaScript or TypeScript project.

## Prerequisites

Before installing bVault-js, ensure your environment meets these requirements:

- **Node.js**: Version 14 or higher
- **npm** or **yarn** package manager
- **Modern Browser**: Supports Web Crypto API (Chrome 37+, Firefox 34+, Safari 14+, Edge 79+)

## Package Installation

### Using npm

```bash
npm install bvault-js
```

### Using yarn

```bash
yarn add bvault-js
```

### Using pnpm

```bash
pnpm add bvault-js
```

## Browser Support

bVault-js relies on the Web Crypto API, which is supported in:

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 37+             |
| Firefox | 34+             |
| Safari  | 14+             |
| Edge    | 79+             |
| Opera   | 24+             |

## TypeScript Support

bVault-js includes full TypeScript type definitions out of the box. No additional type packages are required.

If you're using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "lib": [
      "ES2020",
      "DOM"
    ],
    "module": "ESNext",
    "target": "ES2020"
  }
}
```

## CDN Usage (Still in beta)

:::warning

This CDN feature is still in beta. Use at your own risk.

It will soon be stable enough to be used in production.

:::

For quick prototyping or without build tools, you can use bVault-js via CDN:

```html

<script type="module">
    import {encrypt} from 'https://cdn.jsdelivr.net/npm/bvault-js/dist/bvault.min.js';

    // Use the library
    const encrypted = await encrypt('secret data', 'password');
</script>
```

```html

<script src='https://cdn.jsdelivr.net/npm/bvault-js/dist/bvault.min.js'></script>
<script>
    // Initialize secure storage with a password
    initializeSecureStorage('your-strong-password')
            .then(() => {
                console.log('Secure storage initialized');

                // Store data securely
                secureLocalStorage.setItem('user', JSON.stringify({
                    name: 'John Doe',
                    email: 'john@example.com',
                    preferences: {theme: 'dark'}
                }));

                secureSessionStorage.setItem('authToken', 'abc123xyz');

                // Retrieve data
                const user = await secureLocalStorage.getItem('user');
                console.log('User:', JSON.parse(user));

                const token = await secureSessionStorage.getItem('authToken');
                console.log('Token:', token);

                // Remove items
                secureSessionStorage.removeItem('authToken');

                // Check if storage is initialized
                if (isSecureStorageInitialized()) {
                    console.log('Secure storage is ready');
                }
            })
            .catch(error => {
                console.error('Initialization failed:', error);
            });
</script>
```

## Verification

To verify your installation, create a simple test:

```javascript
import {encrypt, decrypt} from 'bvault-js';

async function testInstallation() {
    try {
        const encrypted = await encrypt('test data', 'password');
        const decrypted = await decrypt(encrypted.encryptedData, 'password', encrypted.iv, encrypted.salt);

        console.log('Installation successful:', decrypted === 'test data');
    } catch (error) {
        console.error('Installation failed:', error);
    }
}

testInstallation();
```

## Troubleshooting

### Common Issues

1. **Web Crypto API not available**
    - Ensure you're using a supported browser
    - Check that your page is served over HTTPS (required for some Crypto API features)

2. **Module not found errors**
    - Verify the package name is correct: `bvault-js`
    - Check your import statements

3. **TypeScript errors**
    - Ensure you have the latest TypeScript version
    - Check your `tsconfig.json` compiler options

Now that you've installed bVault-js, continue to the [` Quick Start Guide `](/docs/getting-started/quick-start) to learn
how to use it.
