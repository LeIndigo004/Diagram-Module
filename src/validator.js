/**
 * This file handles the validation of the diagrams.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class Validator {
  validateLabels(labels) {
    const { yTitle, xTitle, maxValueForY, numOfYLabels } = labels;
    
    if (typeof yTitle !== 'string') {
      throw new Error('yTitle must be a string.');
    }
  
    if (typeof xTitle !== 'string') {
      throw new Error('xTitle must be a string.');
    }
  
    if (typeof maxValueForY !== 'number' || maxValueForY <= 0) {
      throw new Error('maxValueForY must be a positive number.');
    }
  
    if (!Number.isInteger(numOfYLabels) || numOfYLabels <= 0) {
      throw new Error('numOfYLabels must be a positive integer.');
    }

    if (maxValueForY < numOfYLabels) {
      throw new Error('maxValueForY must be greater than or equal to numOfYLabels.');
    }
  }
  
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