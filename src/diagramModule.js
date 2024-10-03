/**
 * The start point of this module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Creates the main class for this diagram module.
 */
export class DiagramModule {
  #ctx
  #width
  #height

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
    const minWidth = 200
    const minHeight = 150
    const maxWidth = 1000
    const maxHeight = 1000

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
    console.log(`Canvas size set to: ${this.#width}x${this.#height}`)
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
      this.#ctx.fillText(title, this.#width / 2, this.#height * 0.05) // try to center text
    }  
  }

  /**
   * Creates a pie chart which takes data and colors as parameters.
   *
   * @param {Object[]} data - The given data.
   * @param {string[]} colors - The given colors
   */
  createPieChart (data, colors) {
    const total = data.reduce((sum, value) => sum + value, 0)
    let startAngle = 0
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = data[i] / total * 2 * Math.PI
      const endAngle = startAngle + sliceAngle
      this.#ctx.beginPath()
      // create slice of pie chart
      this.#ctx.moveTo(this.#width / 2, this.#height / 2)
      this.#ctx.arc(this.#width / 2, this.#height / 2, this.#width / 4, startAngle, endAngle)
      this.#ctx.closePath()
      this.#ctx.fillStyle = colors[i]
      this.#ctx.fill()

      startAngle = endAngle
    }
  }

  /**
   * 
   * @param {*} data 
   * @param {*} colors 
   * @param {*} xLabel 
   * @param {*} xLabels 
   * @param {*} yLabel 
   * @param {*} maxValueForY 
   * @param {*} numOfLabels 
   */
  createBarChart (data, yLabel, maxValueForY, numOfLabels) {
    const label = data.map(item => item.label)
    const value = data.map(item => item.value)
    const color = data.map(item => item.color)
    
    this.#setYLabels(yLabel, maxValueForY, numOfLabels)
    this.#setXLabels('Months', label)

    const marginHeight = this.#height * 0.2
    const marginWidth = this.#width * 0.2

    for (let i = 0; i < data.length; i++) {

      const barWidth = (this.#width - marginWidth * 2) / label.length
      const barHeight = (value[i] / maxValueForY) * (this.#height - 2 * marginHeight)

      this.#ctx.fillStyle = color[i]
      const barX  = marginWidth + i * barWidth
      this.#ctx.beginPath()
      this.#ctx.fillRect(barX, this.#height - marginHeight, barWidth, -barHeight)
      this.#ctx.stroke()

    }
  }

  createLineChart() {
    this.#setYLabels(10, 10)
  }

  #setXLabels (xLabelName, xLabels) {
    const marginHeight = this.#height * 0.2
    const marginWidth = this.#width * 0.2
    this.#drawAxes(marginHeight, marginWidth)
    const fontSize = this.#height * 0.03
    this.#ctx.font = `${fontSize}px Georgia`; // Set font size
    this.#ctx.textAlign = 'left'
    this.#ctx.fillText(xLabelName, (this.#width - marginWidth) * 1.02, this.#height - marginHeight)

    const step = (this.#width - 2 * marginWidth) / xLabels.length

    for (let i = 0; i < xLabels.length; i++) {
      const labelX = marginWidth + (i + 1)* step

      this.#ctx.beginPath()
      this.#ctx.moveTo(labelX, this.#height - marginHeight - 5)
      this.#ctx.lineTo(labelX, this.#height - marginHeight + 5)
      this.#ctx.stroke()

      this.#ctx.font = `${this.#height * 0.013}px Georgia`; // Set font size
      this.#ctx.textAlign = 'center'
      this.#ctx.fillText(xLabels[i], labelX, (this.#height - marginHeight) * 1.05)
      console.log(xLabels[i])
    }
  }

  #setYLabels (yLabel, maxValueForY, yNumOfLabels) {
    const marginHeight = this.#height * 0.2
    const marginWidth = this.#width * 0.2
    this.#drawAxes(marginHeight, marginWidth)
    this.#ctx.textAlign = 'center'

    this.#ctx.font = `${this.#height * 0.03}px Georgia` // Set font size
    this.#ctx.fillText(yLabel, marginWidth, marginHeight / 2)

    for (let i = 0; i <= yNumOfLabels; i++) {
      // Calculate the value of the label
      const labelValue = maxValueForY - (maxValueForY/yNumOfLabels * i)
      // Calculate the position
      const labelY = marginHeight + ((this.#height - 2 * marginHeight) / yNumOfLabels) * i

      this.#ctx.beginPath()
      this.#ctx.moveTo(marginWidth - 5, labelY)
      this.#ctx.lineTo(marginWidth + 5, labelY)
      this.#ctx.stroke()

      this.#ctx.font = `${this.#height * 0.03}px Georgia`
      this.#ctx.textAlign = 'center'
      this.#ctx.fillText(labelValue.toFixed(0), marginWidth * 0.5, labelY)
    }
  }

  #drawAxes (marginWidth, marginHeight) {

    // x axel
    this.#ctx.beginPath()
    this.#ctx.moveTo(marginWidth, this.#height - marginHeight)
    this.#ctx.lineTo(this.#width - marginWidth, this.#height - marginHeight)

    // y axel
    this.#ctx.moveTo(marginWidth, this.#height - marginHeight)
    this.#ctx.lineTo(marginWidth, marginHeight)
    this.#ctx.stroke()
  }
}