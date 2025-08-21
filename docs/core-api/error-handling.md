---
id: error-handling
title: Error Handling
sidebar_position: 3
description: Comprehensive guide to error handling in bVault-js
---

# Error Handling

Proper error handling is crucial for cryptographic operations. bVault-js provides specific error types and patterns to
help you build robust applications.

## Error Types

### EncryptionError

Thrown when encryption operations fail.

**Properties:**

- `message`: Error description
- `cause`: Original error (if available)

**Example:**

```javascript
import {encrypt, EncryptionError} from 'bvault-js';

async function safeEncrypt(data, password) {
    try {
        return await encrypt(data, password);
    } catch (error) {
        if (error instanceof EncryptionError) {
            console.error('Encryption process failed:', error.message);
            // Handle specific encryption failure
            throw new Error('Failed to encrypt sensitive data');
        }
        throw error; // Re-throw unexpected errors
    }
}
```

### DecryptionError

Thrown when decryption operations fail, typically due to incorrect password or corrupted data.

**Properties:**

- `message`: Error description
- `cause`: Original error (if available)

**Example:**

```javascript
import {decrypt, DecryptionError} from 'bvault-js';

async function safeDecrypt(encryptedData, password, iv, salt) {
    try {
        return await decrypt(encryptedData, password, iv, salt);
    } catch (error) {
        if (error instanceof DecryptionError) {
            console.error('Decryption failed:', error.message);
            // This usually means wrong password or corrupted data
            return null;
        }
        throw error;
    }
}
```

## Common Error Scenarios

### Wrong Password

```javascript
import {decrypt, DecryptionError} from 'bvault-js';

async function handleWrongPassword() {
    try {
        await decrypt(encryptedData, 'wrong-password', iv, salt);
    } catch (error) {
        if (error instanceof DecryptionError) {
            // Inform user without revealing details
            alert('Incorrect password. Please try again.');
            return;
        }
        throw error;
    }
}
```

### Corrupted Data

```javascript
async function handleCorruptedData() {
    try {
        await decrypt('corrupted-data', password, iv, salt);
    } catch (error) {
        if (error instanceof DecryptionError) {
            console.error('Data appears to be corrupted');
            // Optionally remove the corrupted data
            localStorage.removeItem('corruptedKey');
            return null;
        }
        throw error;
    }
}
```

### Storage Isn't Initialized

```javascript
import {secureLocalStorage, isSecureStorageInitialized} from 'bvault-js';

async function safeStorageOperation(key, value) {
    if (!isSecureStorageInitialized()) {
        throw new Error('Secure storage not initialized. Call initializeSecureStorage() first.');
    }

    return await secureLocalStorage.setItem(key, value);
}
```

## Comprehensive Error Handling Pattern

```javascript
import {
    encrypt,
    decrypt,
    secureLocalStorage,
    EncryptionError,
    DecryptionError
} from 'bvault-js';

class SecureDataService {
    constructor(masterPassword) {
        this.masterPassword = masterPassword;
        this.initialized = false;
    }

    async initialize() {
        try {
            await initializeSecureStorage(this.masterPassword);
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize secure storage:', error);
            throw new Error('Storage initialization failed');
        }
    }

    async encryptData(data) {
        try {
            return await encrypt(data, this.masterPassword);
        } catch (error) {
            if (error instanceof EncryptionError) {
                throw new Error('Failed to encrypt data: ' + error.message);
            }
            throw error;
        }
    }

    async decryptData(encryptedData, iv, salt) {
        try {
            return await decrypt(encryptedData, this.masterPassword, iv, salt);
        } catch (error) {
            if (error instanceof DecryptionError) {
                // Don't reveal that it's a decryption error to users
                throw new Error('Failed to process data');
            }
            throw error;
        }
    }

    async storeSecure(key, value) {
        if (!this.initialized) {
            throw new Error('Service not initialized');
        }

        try {
            await secureLocalStorage.setItem(key, value);
        } catch (error) {
            console.error('Storage failed for key:', key, error);
            throw new Error('Failed to store data securely');
        }
    }

    async retrieveSecure(key) {
        if (!this.initialized) {
            throw new Error('Service not initialized');
        }

        try {
            const data = await secureLocalStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            if (error instanceof DecryptionError) {
                console.error('Decryption failed for key:', key);
                // Remove corrupted data
                secureLocalStorage.removeItem(key);
                return null;
            }
            throw error;
        }
    }
}
```

## User-Friendly Error Messages

```javascript
function getUserFriendlyError(error) {
    if (error instanceof EncryptionError) {
        return 'Unable to secure your data at this time. Please try again.';
    }

    if (error instanceof DecryptionError) {
        return 'Unable to access your data. Please check your password and try again.';
    }

    if (error.message.includes('not initialized')) {
        return 'Security system not ready. Please refresh the page.';
    }

    return 'An unexpected error occurred. Please try again.';
}

// Usage
try {
    await secureOperation();
} catch (error) {
    const message = getUserFriendlyError(error);
    showErrorToUser(message);
}
```

## Logging and Monitoring

```javascript
class ErrorLogger {
    static logCryptoError(error, context = {}) {
        const logData = {
            timestamp: new Date().toISOString(),
            errorType: error.constructor.name,
            errorMessage: error.message,
            stack: error.stack,
            context
        };

        // Send to monitoring service
        console.error('Crypto Error:', logData);

        // Or send to your error tracking service
        // trackError(logData);
    }
}

// Usage
try {
    await encrypt(sensitiveData, password);
} catch (error) {
    ErrorLogger.logCryptoError(error, {
        operation: 'encrypt',
        dataLength: sensitiveData.length
    });
    throw error;
}
```

:::info

Remember: Proper error handling prevents sensitive information leakage and provides better user experience.

:::