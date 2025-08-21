---
id: secure-storage
title: Secure Storage
sidebar_position: 2
description: Encrypted localStorage and sessionStorage wrapper for secure client-side data storage
---

# Secure Storage API

bVault-js provides a secure wrapper around the browser's localStorage or sessionStorage that automatically encrypts and
decrypts data
using your master password.

## Initialization

`initializeSecureStorage(password: string)`

Initializes the secure storage system. Must be called once before using secure storage functions.

**Parameters:**

- `password` (string): The master password for encryption/decryption

**Example:**

:::info

We recommend you use fingerprint libraries like [ThumbmarkJS](https://thumbmarkjs.com) or [FingerprintJS](https://fingerprint.com). Sample code will be provided on GitHub soon

:::

```javascript
import {initializeSecureStorage} from 'bvault-js';

// Call this once at application startup
async function appInit() {
    await initializeSecureStorage('your-app-master-password');
    console.log('Secure storage initialized');
}

appInit().catch(console.error);
```

## Storage Methods

`secureLocalStorage.setItem(key: string, value: unknown)`

Stores data securely. The value is automatically encrypted before storage.

**Parameters:**

- `key` (string): Storage key
- `value` (unknown): Data to store (will be JSON stringified)

**Example:**

```javascript
import {secureLocalStorage} from 'bvault-js';

async function storeUserData() {
    const userData = {
        id: 123,
        email: 'user@example.com',
        preferences: {
            theme: 'dark',
            language: 'en'
        }
    };

    await secureLocalStorage.setItem('userData', userData);
    console.log('Data stored securely');
}
```

`secureLocalStorage.getItem(key: string)`

Retrieves and decrypts stored data.

**Parameters:**

- `key` (string): Storage key

**Returns:** `Promise<string | null>`

**Example:**

```javascript
import {secureLocalStorage} from 'bvault-js';

async function retrieveUserData() {
    const encryptedData = await secureLocalStorage.getItem('userData');

    if (encryptedData) {
        const userData = JSON.parse(encryptedData);
        console.log('Retrieved user data:', userData);
        return userData;
    }

    console.log('No data found for key');
    return null;
}
```

`secureLocalStorage.removeItem(key: string)`

Removes an item from secure storage.

**Parameters:**

- `key` (string): Storage key to remove

**Example:**

```javascript
import {secureLocalStorage} from 'bvault-js';

function clearUserData() {
    secureLocalStorage.removeItem('userData');
    console.log('User data removed');
}
```

`secureLocalStorage.clear()`

Clears all securely stored data.

**Example:**

```javascript
import {secureLocalStorage} from 'bvault-js';

function clearAllData() {
    secureLocalStorage.clear();
    console.log('All secure data cleared');
}
```

## Utility Functions

`isSecureStorageInitialized()`

Checks if secure storage has been initialized.

**Returns:** `boolean`

**Example:**

```javascript
import {isSecureStorageInitialized} from 'bvault-js';

function checkStorageStatus() {
    if (isSecureStorageInitialized()) {
        console.log('Secure storage is ready');
    } else {
        console.log('Secure storage not initialized');
    }
}
```

## Complete Example

```javascript
import {
    initializeSecureStorage,
    secureLocalStorage,
    isSecureStorageInitialized
} from 'bvault-js';

class SecureDataManager {
    constructor(masterPassword) {
        this.masterPassword = masterPassword;
        this.initialized = false;
    }

    async initialize() {
        if (isSecureStorageInitialized()) {
            console.log('Already initialized');
            this.initialized = true;
            return;
        }

        await initializeSecureStorage(this.masterPassword);
        this.initialized = true;
        console.log('Secure storage initialized');
    }

    async storeUserProfile(profile) {
        if (!this.initialized) {
            throw new Error('Secure storage not initialized');
        }

        await secureLocalStorage.setItem('userProfile', profile);
        console.log('Profile stored securely');
    }

    async getUserProfile() {
        if (!this.initialized) {
            throw new Error('Secure storage not initialized');
        }

        const data = await secureLocalStorage.getItem('userProfile');
        return data ? JSON.parse(data) : null;
    }

    clearProfile() {
        secureLocalStorage.removeItem('userProfile');
        console.log('Profile cleared');
    }
}

// Usage
const manager = new SecureDataManager('app-secret-2024');
await manager.initialize();
await manager.storeUserProfile({name: 'Alice', age: 30});
const profile = await manager.getUserProfile();
```

## Storage Structure

Secure storage uses a specific structure in localStorage:

```json
// Original key: 'userData'
// Becomes: 'bvault_enc_userData'

// The stored value structure:
{
  encryptedData: "base64-encrypted-data",
  iv: "base64-iv",
  salt: "base64-salt"
}
```

This prevents conflicts with other localStorage usage and makes secure items identifiable.

## Error Handling

```javascript
import {
    secureLocalStorage,
    DecryptionError
} from 'bvault-js';

async function safeDataRetrieval(key) {
    try {
        const data = await secureLocalStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        if (error instanceof DecryptionError) {
            console.error('Decryption failed - wrong password?');
            // Optionally clear corrupted data
            secureLocalStorage.removeItem(key);
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
}
```

## Migration from Regular localStorage

```javascript
async function migrateToSecureStorage(password) {
    // Initialize first
    await initializeSecureStorage(password);

    // Migrate existing data
    const keysToMigrate = ['userSettings', 'appConfig', 'authToken'];

    for (const key of keysToMigrate) {
        const value = localStorage.getItem(key);
        if (value) {
            await secureLocalStorage.setItem(key, value);
            localStorage.removeItem(key);
            console.log(`Migrated: ${key}`);
        }
    }
}
```

Continue to [` Error Handling `](/docs/core-api/error-handling) for comprehensive error management strategies.
