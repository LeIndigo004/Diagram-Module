/**
 * This file handles the barChart of the diagram.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

import { Axes } from "./axes.js"

export class BarChart {
  #ctx
  #height
  #width
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
   * Renders the bar chart with axes and bars.
   *
   * @param {Object[]} data - Array of objects containing `label`, `value`, and `color` for each bar.
   * @param {String} yTitle - Title for the y-axis.
   * @param {String} xTitle - Title for the x-axis.
   * @param {Number} maxValueForY - Maximum value for the y-axis.
   * @param {Number} numOfYLabels - Number of y-axis labels.
   */
  drawChart(data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    this.#calculateMargins()
    this.#axes.drawLabels(yTitle, xTitle, this.#extractLabels(data), maxValueForY, numOfYLabels, false)

    const barWidth = this.#calculateBarWidth(data.length)
    data.forEach((item, index) => this.#drawBar(item, index, barWidth, maxValueForY, data.length))
  }

  #calculateMargins() {
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2
  }

  #extractLabels(data) {
    return data.map(item => item.label)
  }

  #calculateBarWidth(numBars) {
    const availableWidth = this.#width - 2 * this.#marginWidth
    return (availableWidth / numBars) * 0.5 // Adjust bar width as a fraction of available space
  }

  #drawBar(item, index, barWidth, maxValueForY, numBars) {
    if (item.value > maxValueForY) {
      throw new Error('The max value for Y cannot be smaller than the given values')
    }

    const labelX = this.#calculateLabelPosition(index, numBars)
    const barHeight = this.#calculateBarHeight(item.value, maxValueForY)
    const barPosition = this.#calculateBarPosition(labelX, barWidth)

    this.#renderBar(barPosition, barHeight, barWidth, item.color)
  }

  #calculateLabelPosition(index, numBars) {
    const availableWidth = this.#width - 2 * this.#marginWidth
    return this.#marginWidth + (index + 0.5) * (availableWidth / numBars)
  }

  #calculateBarHeight(value, maxValueForY) {
    const chartHeight = this.#height - 2 * this.#marginHeight
    return (value / maxValueForY) * chartHeight
  }

  #calculateBarPosition(labelX, barWidth) {
    return labelX - barWidth / 2
  }

  #renderBar(barPosition, barHeight, barWidth, color) {
    this.#ctx.beginPath()
    this.#ctx.fillStyle = color
    this.#ctx.fillRect(barPosition, this.#height - this.#marginHeight, barWidth, -barHeight)
    this.#ctx.stroke()
  }
}
