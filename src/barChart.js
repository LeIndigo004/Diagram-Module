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
  constructor (ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
    this.#axes = new Axes(this.#ctx, this.#width, this.#height)
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
  drawChart (data, yTitle, xTitle, maxValueForY, numOfYLabels) {
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)
    const color = data.map(item => item.color)

    // Define margins for bar chart
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2

    // Get the axes and its labels
    this.#axes.drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, false)
    const availableWidth = this.#width - this.#marginWidth * 2
    const barWidth = availableWidth / label.length * 0.5 // Adjust the bar width 

    for (let i = 0; i < data.length; i++) {
      // Validate input
      if (maxValueForY < value[i]) {
        throw new Error('The max value for Y cannot be smaller than the given values')
      }
       // Calculate the central position of each label on x
       const labelX = this.#marginWidth + (i + 0.5) * (availableWidth / label.length)
      
       // Get the bar height
       const barHeight = ((value[i])/ maxValueForY) * (this.#height - 2 * this.#marginHeight)
 
       // Get the bar on the right position through dividing the width of the
       // bar by 2 and substract it with the central position of each label
       const barPosition = labelX - barWidth / 2
       this.#ctx.beginPath()
       this.#ctx.fillStyle = color[i]
       this.#ctx.fillRect(barPosition, this.#height - this.#marginHeight, barWidth, -barHeight)
       this.#ctx.stroke()
    }
  }
}