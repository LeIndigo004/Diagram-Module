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
   * Sets the width and height of the canvas.
   *
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   */
  setSize(width, height) {
    try {
      this.#width = width
      this.#height = height
      this.#validateChartSize()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Sets the title of the diagram.
   *
   * @param {string} title - The title of the diagram.
   * @param {string} font - The font of the title.
   */
  setTitle(title, font) {
    try {
      this.#validateTitle(title, font)
      this.#ctx.textAlign = 'center'
      this.#ctx.font = `bold ${this.#height * 0.05}px ${font}`
      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(title, this.#width / 2, this.#height * 0.06)
    } catch (error) {
      console.error(error)
    }
  }

  #validateTitle(title, font) {
    if (title === '' || font === '') {
      throw new Error('Please, do not use an empty string.')
    }
    if (title.length > 50) {
      throw new Error('Maximal length of string is 50.')
    }
    if (typeof title !== 'string' || typeof font !== 'string') {
      throw new Error('Must be of the type string.')
    }
  }

  createPieChart(data, viewData) {
    this.#createChart(PieChart, data, viewData)
  }

  createBarChart(data, labels) {
    this.#createChart(BarChart, data, labels)
  }

  createLineChart(data, labels) {
    this.#createChart(LineChart, data, labels)
  }

  #createChart(ChartClass, data, labelsOrviewPercent) {
    try {
      this.#validateChartData(data)

      if (ChartClass === PieChart) {
        // Create PieChart
        this.#pieChart = new PieChart(this.#ctx, this.#width, this.#height)
        this.#pieChart.drawChart(data, labelsOrviewPercent)
      } else {
        // Validate and create BarChart or LineChart
        this.#validateChartLabels(labelsOrviewPercent)
        const chart = new ChartClass(this.#ctx, this.#width, this.#height)
        chart.drawChart(data, labelsOrviewPercent.yTitle, labelsOrviewPercent.xTitle, labelsOrviewPercent.maxValueForY, labelsOrviewPercent.numOfYLabels)
        if (ChartClass === BarChart) {
          this.#barChart = chart 
        }
        if (ChartClass === LineChart) {
          this.#lineChart = chart
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)

  }

  #validateChartSize() {
    const minValue = 400
    const maxValue = 1200

    if (typeof this.#width !== 'number' || typeof this.#height !== 'number') {
      throw new Error('Width and height must be of the type number.') 
    }
    if (this.#width < minValue || this.#height < minValue) {
      throw new Error(`Width or height must be at least ${minValue}px.`)
    }
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