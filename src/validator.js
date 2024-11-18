/**
 * This file handles the validation of the diagrams.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class Validator {
  validateLabels(labels) {
    const { yTitle, xTitle, maxValueForY, numOfYLabels } = labels

    this.#validateTitle(yTitle, 'yTitle')
    this.#validateTitle(xTitle, 'xTitle')
    this.#validateMaxValueForY(maxValueForY)
    this.#validateNumOfYLabels(numOfYLabels)
    this.#validateMaxValueVsNumOfYLabels(maxValueForY, numOfYLabels)
  }

  #validateTitle(title, titleName) {
    if (typeof title !== 'string') {
      throw new Error(`${titleName} must be a string.`)
    }
  }

  #validateMaxValueForY(maxValueForY) {
    if (typeof maxValueForY !== 'number' || maxValueForY <= 0) {
      throw new Error('maxValueForY must be a positive number.')
    }
  }

  #validateNumOfYLabels(numOfYLabels) {
    if (!Number.isInteger(numOfYLabels) || numOfYLabels <= 0) {
      throw new Error('numOfYLabels must be a positive integer.')
    }
  }

  #validateMaxValueVsNumOfYLabels(maxValueForY, numOfYLabels) {
    if (maxValueForY < numOfYLabels) {
      throw new Error('maxValueForY must be greater than or equal to numOfYLabels.')
    }
  }

  isDataArray(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array.')
    }
  }

  isArrayWithObject(data) {
    data.forEach(item => this.#validateItemIsObject(item))
  }

  #validateItemIsObject(item) {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Each item in data must be an object.')
    }
  }

  isValueANumber(data) {
    data.forEach(item => this.#validateItemValueIsNumber(item))
  }

  #validateItemValueIsNumber(item) {
    if (typeof item.value !== 'number' || item === null) {
      throw new Error('Data must be of the type number.')
    }
  }
}
