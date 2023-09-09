/**
 * This version of local storage supports the following data types as it is and other data types will be treated as string
 * object, string, number and Boolean
 * To change the custom secure key, Please add `REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY` to .env and change the value
 */
export const secureLocalStorage = {
    hashKey: process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY || '__data-observability__',

    // Method to encode data using XOR encryption
    encodeData(data) {
        let encoded = '';
        for (let i = 0; i < data.length; i++) {
            const charCode = data.charCodeAt(i) ^ this.hashKey.charCodeAt(i % this.hashKey.length);
            encoded += String.fromCharCode(charCode);
        }
        return encoded;
    },

    // Method to decode data using XOR encryption
    decodeData(encodedData) {
        let decoded = '';
        for (let i = 0; i < encodedData.length; i++) {
            const charCode = encodedData.charCodeAt(i) ^ this.hashKey.charCodeAt(i % this.hashKey.length);
            decoded += String.fromCharCode(charCode);
        }
        return decoded;
    },

    /**
     * Function to set value to secure local storage
     * @param key to be added
     * @param value value to be added
     */
    setItem(key, value) {
        const encodedValue = this.encodeData(JSON.stringify(value));
        localStorage.setItem(key, encodedValue);
    },

    /**
     * Function to get value from secure local storage
     * @param key to get
     * @returns
     */
    getItem(key) {
        const encodedValue = localStorage.getItem(key);
        if (encodedValue) {
            return JSON.parse(this.decodeData(encodedValue));
        }
        return null;
    },

    /**
     * Function to remove item from secure local storage
     * @param key to be removed
     */
    removeItem(key) {
        localStorage.removeItem(key);
    },

    /**
     * Function to clear secure local storage
     */
    clear() {
        localStorage.clear();
    }
};
