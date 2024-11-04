/**
 * This file handles the validation of the diagrams.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class Validator {
  isDataArray (data) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array.')
    }
  }

  isArrayWithObject(data) {
    for (const item of data) {
      if (typeof item !== 'object' || item === null) {
        throw new Error('Each item in data must be an object.');
      }
    }
  }

  isValueANumber(data) {
    for (const item of data) {
      if (typeof item.value !== 'number' || item === null) {
        throw new Error('Data must be of the type number.');
      }
    }
  }
}