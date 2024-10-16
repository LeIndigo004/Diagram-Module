/**
 * The start point of this module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

import { PieChart } from "./pieChart.js"
import { BarChart } from "./barChart.js"
import { LineChart } from "./lineChart.js"

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

  constructor (canvasId) {
    const canvas = document.getElementById(canvasId)
    this.#ctx = canvas.getContext('2d', { willReadFrequently: true })
    // Default
    this.setSize(400, 400)
  }

  /**
   * A public method where the user can decide the width and height of the canvas.
   *
   * @param {string} width - The width of the canvas.
   * @param {string} height - The height of the canvas.
   */
  setSize (width, height) {
    // Validate given pixels
    const minValue = 400
    const maxValue = 1200

    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Width and height must be of the type number.')
    }
    // Mainimum value
    if (width < minValue || height < minValue) {
      throw new Error(`Width or height must be at least ${minValue}px.`)
    }

    // Maximum value
    if (width > maxValue || height > maxValue) {
      throw new Error(`Width or height cannot exceed ${maxValue}px.`)
    }
  
    // Set the values to the private fields
    this.#width = width
    this.#height = height
  }

  /**
   * A public method represanting the title of the diagram.
   *
   * @param {string} title - The title of the diagram.
   * @param {string} font - The font of the title.
   */
  setTitle (title, font) {
    // If the given string is empty.
    if (title === '' || font === '') {
      throw new Error('Please, do not use an empty string.')
    // If the given string has a length longer than 50.
    } else if (title.length > 50) {
      throw new Error('Maximal length of string is 50.')
    } else {
      this.#ctx.textAlign = 'center'
      this.#ctx.font = `bold ${this.#height * 0.05}px ${font}`
      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(title, this.#width / 2, this.#height * 0.06) // try to center text
    }  
  }

  /**
   * Creates a pie chart which takes data and colors as parameters.
   *
   * @param {Object[]} data - The given data.
   * @param {string[]} colors - The given colors
   */
  createPieChart (data, viewData) {
    this.#pieChart = new PieChart(this.#ctx, this.#width, this.#height)
    this.#pieChart.drawChart(data, viewData)
  }

/**
 * Creates a bar chart with customizable labels for y and x axels, and colors.
 *
 * @param {Object[]} data - The given data to track in the diagram
 * @param {String} xTitle - The title of the x axel
 * @param {String} yTitle - The title of the y axel
 * @param {Number} maxValueForY - The highest value on the y axel
 * @param {Number} numOfYLabels - The amount of written out labels you want on the y axel
 */
  createBarChart (data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    this.#barChart = new BarChart(this.#ctx, this.#width, this.#height)
    this.#barChart.drawChart(data, yTitle, xTitle, maxValueForY, numOfYLabels)
  }

/**
 * Creates a line chart with customizable labels for y and x axels.
 *
 * @param {Object[]} data - The given data to track in the diagram
 * @param {String} xTitle - The title of the x axel
 * @param {String} yTitle - The title of the y axel
 * @param {Number} maxValueForY - The highest value on the y axel
 * @param {Number} numOfYLabels - The amount of written out labels you want on the y axel
 */
  createLineChart(data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    this.#lineChart = new LineChart(this.#ctx, this.#width, this.#height)
    this.#lineChart.drawChart(data, yTitle, xTitle, maxValueForY, numOfYLabels)
  }

  /**
   * Public method for clearing the canvas of an existing chart.
   */
  clear () {
    if (this.#isCanvasClear()) {
      throw new Error('Canvas is already cleared')
    } else {
      this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
      this.setSize(400, 400)
      console.log('Cleared chart!')
    }
  }

  /**
   * Private method for checking if a canvas is cleared or not.
   *
   * @returns a boolean value of true if the canvas is cleared.
   */
  #isCanvasClear () {
    return this.#ctx.getImageData(0, 0, this.#width, this.#height).data
    .every(value => value === 0)
  }
}