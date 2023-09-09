import { toast } from 'react-toastify';
/**
 This function takes a string str as input and returns a new string with the first letter capitalized and the remaining letters converted to lowercase. Here's how you can use it:
console.log(capitalize('DATBASE')); // Output: Database
console.log(capitalize('table')); // Output: Table
 * @param {String} str 
 * @returns {String}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * You can remove duplicate objects from an array of objects in JavaScript 
 * by first creating a Set of unique email addresses, 
 * and then converting it back to an array. 
 * @param {array} list 
 * @returns {array}
 */
export function removeDuplicateObjects(list, key) {
  const uniqueItems = new Set(list.map((item) => item[key]));
  const uniqueList = [...uniqueItems].map((email) => {
    return list.find((item) => item[key] === email);
  });
  return uniqueList;
}

/**
 * You can compare two arrays of objects and return the objects 
 * that have matching objects in an array format using the filter() method.:
 * @param {array} arr1 
 * @param {array} arr2 
 * @param {string} arr2 
 * @returns {array}
 */
export function findMatchingObjects(arr1, arr2, key = '') {
  const matchingEmails = arr1.filter((obj1) => {
    return arr2.some((obj2) => {
      return obj1.email === obj2.email;
    });
  });
  if (key)
    return [...new Set(matchingEmails.map((item) => item[key]))];
  return matchingEmails;
}

/**
 * Converts UTC date and time to the corresponding local date and time.
 * @param {string} utcDateTime - The UTC date and time string to be converted.
 * @returns {string} The local date and time string.
 */
export function UTC_to_local_timeConversion(utcDateTime) {
  return new Date(`${utcDateTime.toLocaleLowerCase().includes('z') ? utcDateTime : `${utcDateTime}Z`}`);
}

/**
 * Encode and Decode given string based on decode value.
 * @param {string} inputString - string to be encode/decode.
 * @param {int} decode - bool value either to encode or decode.
 * @returns {string} resulted string.
 */
export function encodeDecoder(inputString, decode = 0) {
  if (decode === 0) {
    return encodeURIComponent(inputString);
  } else if (decode === 1) {
    return decodeURIComponent(inputString);
  } else {
    return 'Invalid decode value. Please use 0 for encoding or 1 for decoding.';
  }
}

export function getQueryParamsObj(queryParams, keys) {
  if (Array.isArray(keys)) {
    let paramsValues = {};
    keys.forEach(key => paramsValues[key] = queryParams.get(key) || '');
    return paramsValues;
  }
  return {};
}

/**
 * Compare two versions of the same array of objects and return the difference.
 * @param {array} prevArray - The previous version of the array of objects
 * @param {array} currentArray - The current version of the array of objects
 * @returns {object} - An object describing the difference
 */
export function findArrayDifference(prevArray, currentArray) {
  function findDifferenceObject(arr1, arr2) {
    return arr1.find((obj1) => !arr2.some((obj2) => obj1.email === obj2.email));
  }

  let type;
  let diffObject;

  if (prevArray.length < currentArray.length) {
    type = 'ADDED';
    diffObject = findDifferenceObject(currentArray, prevArray);
  } else {
    type = 'REMOVED';
    diffObject = findDifferenceObject(prevArray, currentArray);
  }
  return {
    diffObject,
    type,
  };
}

export const customToaster = (
  type,
  message,
  position = 'TOP_CENTER',
  customStyle = { backgroundColor: 'white', color: 'black' }) => {
  toast[type](message, {
    position: toast.POSITION[position],
    style: customStyle
  })
}
