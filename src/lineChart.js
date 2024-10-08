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
  constructor (ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
    this.#axes = new Axes(this.#ctx, this.#height, this.#width)
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
  drawChart(data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2

    this.#axes.drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, true)
    const startPosition = this.#height - this.#marginHeight
    const availableWidth = this.#width - 2 * this.#marginWidth
    const availableHeight = this.#height - 2 * this.#marginHeight

    for (let i = 0; i < data.length; i++) {
      
      const xAxel = this.#marginWidth + (i * (availableWidth / (label.length - 1)))
      const yAxel =  startPosition - ((value[i] / maxValueForY) * availableHeight)
      // Draw points as circles
      this.#ctx.beginPath()
      this.#ctx.arc(xAxel, yAxel, 2, 0, 2 * Math.PI)
      this.#ctx.fillStyle = 'black'
      this.#ctx.fill()
    }

    for (let i = 0; i < data.length; i++) {
      // Validate input
      if (maxValueForY < value[i]) { 
        throw new Error('The max value for Y cannot be smaller than the given values')
      }

      const xAxel = this.#marginWidth + (i * (availableWidth / (label.length - 1)))
      const yAxel =  startPosition - ((value[i] / maxValueForY) * availableHeight)
 
        if (i === 0) {
          // Move to the first position
          this.#ctx.moveTo(xAxel, yAxel);
        } else {
          // Draw a line to the next position
          this.#ctx.lineTo(xAxel, yAxel);
        }
    }
    // Make line after loop is done to avoid duplication
    this.#ctx.stroke()
  }
}