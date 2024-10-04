/**
 * The start point of this module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

import { Axes } from "./axes.js"

/**
 * Creates the main class for this diagram module.
 */
export class DiagramModule {
  #ctx
  #width
  #height
  #marginHeight
  #marginWidth
  #axes

  constructor (canvasId) {
    const canvas = document.getElementById(canvasId)
    this.#ctx = canvas.getContext('2d')
    // Default
    this.setSize('400', '400')
  }

  /**
   * A public method where the user can decide the width and height of the canvas.
   *
   * @param {string} width - The width of the canvas.
   * @param {string} height - The height of the canvas.
   */
  setSize (width, height) {
    // Validate given pixels
    const minWidth = 400
    const minHeight = 200
    const maxWidth = 1200
    const maxHeight = 1200

    // Mainimum value
    if (width < minWidth || height < minHeight) {
      throw new Error(`Width must be at least ${minWidth}px and height at least ${minHeight}px.`)
    }

    // Maximum value
    if (width > maxWidth || height > maxHeight) {
      throw new Error(`Width cannot exceed ${maxWidth}px and height cannot exceed ${maxHeight}px.`)
    }
    const canvas = this.#ctx.canvas
    canvas.width = width
    canvas.height = height
  
    // Set the values to the private fields
    this.#width = width
    this.#height = height
    
    this.#axes = new Axes(this.#ctx, width, height)
  }

  /**
   * A public method represanting the title of the diagram.
   *
   * @param {string} title - The title of the diagram.
   * @param {string} font - The font of the title.
   */
  setTitle (title, font) {
    // If the given string is empty.
    if (title === '') {
      throw new Error('Please, do not use an empty string as a title.')
    // If the given string has a length longer than 50.
    } else if (title.length > 50) {
      throw new Error('Maximal length of string is 50.')
    } else {
      this.#ctx.textAlign = 'center'
      this.#ctx.font = `${this.#height * 0.05}px ${font}`
      this.#ctx.fillText(title, this.#width / 2, this.#height * 0.06) // try to center text
    }  
  }

  /**
   * Creates a pie chart which takes data and colors as parameters.
   *
   * @param {Object[]} data - The given data.
   * @param {string[]} colors - The given colors
   */
  createPieChart (data) {
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)
    const color = data.map(item => item.color)
    // Get the percent of each value
    const total = value.reduce((sum, value) => sum + value, 0)
    let startAngle = 0

    const centralX = this.#width / 2
    const centralY = this.#height / 2
    const radius = this.#width / 4

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = value[i] / total * 2 * Math.PI
      const endAngle = startAngle + sliceAngle
      const textPosition = this.#height * 0.15 + (i * (this.#height * 0.07))
      this.#ctx.beginPath()
      // create slice of pie chart
      this.#ctx.moveTo(centralX, centralY)
      this.#ctx.arc(centralX, centralY, radius, startAngle, endAngle)
      this.#ctx.closePath()

      // The labels
      this.#ctx.font = `bold ${this.#height * 0.025}px Cambia`
      this.#ctx.textAlign = 'left'
      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(`${label[i].charAt(0).toUpperCase() + label[i].slice(1)}: ${
      (value[i]/ total * 100).toFixed(2)}%`, 
      this.#width * 0.05, textPosition)

      // Small dots beside labels
      this.#ctx.arc(this.#width * 0.02, textPosition * 0.96, 8, 0, 2 * Math.PI)
      this.#ctx.fillStyle = color[i]
      this.#ctx.fill()

      startAngle = endAngle
    }
  }

  #drawLabelText (textposition, i, label, value) {
    
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
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)
    const color = data.map(item => item.color)

    // Define margins for bar chart
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2

    // Get the axes and its labels
    this.#drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, false)
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
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)

    this.#drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, true)
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

  #drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, isLineChart) {
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2

    // Get the axes and its labels
    this.#axes.drawAxes(this.#marginHeight, this.#marginWidth)
    this.#axes.setYLabels(this.#marginHeight, this.#marginWidth, yTitle, maxValueForY, numOfYLabels)
    this.#axes.setXLabels(this.#marginHeight, this.#marginWidth, xTitle, label, isLineChart)
  }
}