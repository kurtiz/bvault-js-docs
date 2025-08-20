---
id: quick-start
title: Quick Start
sidebar_position: 2
description: Get started quickly with bVault-js basic encryption and decryption
---

# Quick Start

This guide will help you quickly get started with bVault-js by showing basic encryption and decryption operations.

## Basic Encryption and Decryption

### Import the Library

```javascript
import {encrypt, decrypt} from 'bvault-js';
```

### Encrypt Data

```javascript
async function encryptData() {
    const password = 'your-strong-password-here';
    const sensitiveData = 'This is my secret message';

    try {
        const result = await encrypt(sensitiveData, password);

        console.log('Encrypted Data:', result.encryptedData);
        console.log('Initialization Vector (IV):', result.iv);
        console.log('Salt:', result.salt);

        // Store these values securely
        return result;
    } catch (error) {
        console.error('Encryption failed:', error);
    }
}
```

### Decrypt Data

```javascript
async function decryptData(encryptedData, iv, salt) {
    const password = 'your-strong-password-here';

    try {
        const decrypted = await decrypt(encryptedData, password, iv, salt);
        console.log('Decrypted Data:', decrypted);
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
}
```

### Complete Example

```javascript
import {encrypt, decrypt} from 'bvault-js';

async function completeExample() {
    const password = 'supersecret123!';
    const originalData = 'Confidential information';

    // Step 1: Encrypt
    console.log('Encrypting data...');
    const encrypted = await encrypt(originalData, password);

    console.log('Encryption successful');
    console.log('Encrypted:', encrypted.encryptedData);
    console.log('IV:', encrypted.iv);
    console.log('Salt:', encrypted.salt);

    // Step 2: Decrypt
    console.log('\nDecrypting data...');
    const decrypted = await decrypt(
        encrypted.encryptedData,
        password,
        encrypted.iv,
        encrypted.salt
    );

    console.log('Decryption successful');
    console.log('Original:', originalData);
    console.log('Decrypted:', decrypted);
    console.log('Match:', originalData === decrypted);
}

completeExample().catch(console.error);
```

## Secure Storage Quick Start

### Initialize Secure Storage

```javascript
import {initializeSecureStorage, secureLocalStorage} from 'bvault-js';

async function setupApp() {
    // Initialize once at app startup
    await initializeSecureStorage('your-app-master-password');

    console.log('Secure storage initialized');
}
```

### Store and Retrieve Data

```javascript
async function useSecureStorage() {
    // Store data
    await secureLocalStorage.setItem('userSettings', {
        theme: 'dark',
        notifications: true,
        language: 'en'
    });

    // Retrieve data
    const settings = await secureLocalStorage.getItem('userSettings');
    if (settings) {
        const parsedSettings = JSON.parse(settings);
        console.log('User settings:', parsedSettings);
    }

    // Remove data
    secureLocalStorage.removeItem('userSettings');
}
```

## Common Patterns

### Error Handling

```javascript
import {encrypt, decrypt, EncryptionError, DecryptionError} from 'bvault-js';

async function safeEncryption(data, password) {
    try {
        return await encrypt(data, password);
    } catch (error) {
        if (error instanceof EncryptionError) {
            console.error('Encryption process failed');
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
```

### Data Serialization

```javascript
async function storeObject(key, object, password) {
    const serialized = JSON.stringify(object);
    const encrypted = await encrypt(serialized, password);

    // Store encrypted data, iv, and salt
    localStorage.setItem(`${key}_data`, encrypted.encryptedData);
    localStorage.setItem(`${key}_iv`, encrypted.iv);
    localStorage.setItem(`${key}_salt`, encrypted.salt);
}

async function retrieveObject(key, password) {
    const encryptedData = localStorage.getItem(`${key}_data`);
    const iv = localStorage.getItem(`${key}_iv`);
    const salt = localStorage.getItem(`${key}_salt`);

    if (!encryptedData || !iv || !salt) return null;

    try {
        const decrypted = await decrypt(encryptedData, password, iv, salt);
        return JSON.parse(decrypted);
    } catch (error) {
        console.error('Failed to retrieve object:', error);
        return null;
    }
}
```

## Next Steps

Now that you understand the basics, explore:

- [Core API Documentation](/docs/core-api/encryption) for detailed usage
- [Secure Storage Guide](/docs/core-api/secure-storage) for encrypted localStorage
- [Framework Integration](/docs/guides/framework-integration) for React, Vue, and other frameworks
