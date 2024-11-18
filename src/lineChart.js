/**
 * This file handles the line chart of the diagram.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

import { Axes } from "./axes.js"

export class LineChart {
  #ctx
  #width
  #height
  #marginHeight
  #marginWidth
  #axes

  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
    this.#axes = new Axes(this.#ctx, this.#height, this.#width)
  }

  /**
   * Draws a line chart with axes and points.
   *
   * @param {Object[]} data - Array of data points, each containing `label` and `value`.
   * @param {String} yTitle - Title for the y-axis.
   * @param {String} xTitle - Title for the x-axis.
   * @param {Number} maxValueForY - Maximum value for the y-axis.
   * @param {Number} numOfYLabels - Number of y-axis labels.
   */
  drawChart(data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    this.#calculateMargins()
    this.#axes.drawLabels(yTitle, xTitle, this.#extractLabels(data), maxValueForY, numOfYLabels, true)

    const availableWidth = this.#width - 2 * this.#marginWidth
    const availableHeight = this.#height - 2 * this.#marginHeight
    const startPosition = this.#height - this.#marginHeight

    this.#validateData(data, maxValueForY)
    this.#drawPoints(data, maxValueForY, availableWidth, availableHeight, startPosition)
    this.#drawLines(data, maxValueForY, availableWidth, availableHeight, startPosition)
  }

  #calculateMargins() {
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2
  }

  #extractLabels(data) {
    return data.map(item => item.label)
  }

  #validateData(data, maxValueForY) {
    data.forEach(item => {
      if (item.value > maxValueForY) {
        throw new Error('The max value for Y cannot be smaller than the given values')
      }
    })
  }

  #drawPoints(data, maxValueForY, availableWidth, availableHeight, startPosition) {
    data.forEach((item, index) => {
      const { x, y } = this.#calculatePointPosition(index, item.value, maxValueForY, availableWidth, availableHeight, startPosition)
      this.#renderPoint(x, y)
    })
  }

  #drawLines(data, maxValueForY, availableWidth, availableHeight, startPosition) {
    this.#ctx.beginPath()

    data.forEach((item, index) => {
      const { x, y } = this.#calculatePointPosition(index, item.value, maxValueForY, availableWidth, availableHeight, startPosition)
      if (index === 0) {
        this.#ctx.moveTo(x, y)
      } else {
        this.#ctx.lineTo(x, y)
      }
    })

    this.#ctx.stroke()
  }

  #calculatePointPosition(index, value, maxValueForY, availableWidth, availableHeight, startPosition) {
    const x = this.#marginWidth + index * (availableWidth / (availableWidth / this.#marginWidth - 1))
    const y = startPosition - (value / maxValueForY) * availableHeight
    return { x, y }
  }

  #renderPoint(x, y) {
    this.#ctx.beginPath()
    this.#ctx.arc(x, y, 3, 0, 2 * Math.PI)
    this.#ctx.fillStyle = 'black'
    this.#ctx.fill()
  }
}
