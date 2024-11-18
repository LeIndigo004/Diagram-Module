/**
 * The start point of this module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

import { PieChart } from "./pieChart.js"
import { BarChart } from "./barChart.js"
import { LineChart } from "./lineChart.js"
import { Validator } from "./validator.js"

/**
 * Creates the main class for this diagram module.
 */
export class DiagramModule {
  #ctx
  #width
  #height
  #pieChart
  #barChart
  #lineChart
  #validator

  constructor(canvasId) {
    const canvas = document.getElementById(canvasId)
    this.#ctx = canvas.getContext('2d', { willReadFrequently: true })
    
    this.setSize(400, 400)

    this.#validator = new Validator()
  }

  /**
   * A public method where the user can decide the width and height of the canvas.
   *
   * @param {string} width - The width of the canvas.
   * @param {string} height - The height of the canvas.
   */
  setSize(width, height) {
    try {
      // Set the values to the private fields
      this.#width = width
      this.#height = height
      this.#validateChartSize()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * A public method represanting the title of the diagram.
   *
   * @param {string} title - The title of the diagram.
   * @param {string} font - The font of the title.
   */
  setTitle(title, font) {
    try {
      // If the given string is empty.
      if (title === '' || font === '') {
        throw new Error('Please, do not use an empty string.')
        // If the given string has a length longer than 50.
      } else if (title.length > 50) {
        throw new Error('Maximal length of string is 50.')
      } else if (typeof title !== 'string' || typeof font !== 'string') {
        throw new Error('Must be of the type string.')
      } else {
        this.#ctx.textAlign = 'center'
        this.#ctx.font = `bold ${this.#height * 0.05}px ${font}`
        this.#ctx.fillStyle = 'black'
        this.#ctx.fillText(title, this.#width / 2, this.#height * 0.06) // try to center text
      }
    } catch (error) {
      console.error(error)
    }
  }

  createPieChart(data, viewData) {
    try {
      this.#validateChartData(data)

      this.#pieChart = new PieChart(this.#ctx, this.#width, this.#height)
      this.#pieChart.drawChart(data, viewData)
    } catch (error) {
      console.error(error)
    }
  }

  createBarChart(data, labels) {
    try {
      this.#validateChartData(data)
      this.#validateChartLabels(labels)

      this.#barChart = new BarChart(this.#ctx, this.#width, this.#height)
      this.#barChart.drawChart(data, labels.yTitle, labels.xTitle, labels.maxValueForY, labels.numOfYLabels)
    } catch (error) {
      console.error(error)
    }
  }


  createLineChart(data, labels) {
    try {
      this.#validateChartData(data)
      this.#validateChartLabels(labels)

      this.#lineChart = new LineChart(this.#ctx, this.#width, this.#height)
      this.#lineChart.drawChart(data, labels.yTitle, labels.xTitle, labels.maxValueForY, labels.numOfYLabels)
    } catch (error) {
      console.error(error)
    }
  }

  clear() {
    try {
      if (this.#isCanvasClear()) {
        throw new Error('Canvas is already cleared')
      } else {
        this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        console.log('Cleared chart!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  #isCanvasClear() {
    return this.#ctx.getImageData(0, 0, this.#width, this.#height).data
      .every(value => value === 0)
  }

  #validateChartSize() {
    // Validate given pixels
    const minValue = 400
    const maxValue = 1200

    if (typeof this.#width !== 'number' || typeof this.#height !== 'number') {
      throw new Error('Width and height must be of the type number.')
    }
    // Mainimum value
    if (this.#width < minValue || this.#height < minValue) {
      throw new Error(`Width or height must be at least ${minValue}px.`)
    }

    // Maximum value
    if (this.#width > maxValue || this.#height > maxValue) {
      throw new Error(`Width or height cannot exceed ${maxValue}px.`)
    }
  }

  #validateChartData(data) {
    this.#validator.isDataArray(data)
    this.#validator.isArrayWithObject(data)
    this.#validator.isValueANumber(data)
  }

  #validateChartLabels(labels) {
    this.#validator.validateLabels(labels)
  }
}