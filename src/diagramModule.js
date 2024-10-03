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
  #marginHeight
  #marginWidth

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
      this.#ctx.fillText(title, this.#width / 2, this.#height * 0.06) // try to center text
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
    this.#drawAxes(this.#marginHeight, this.#marginWidth)
    this.#setYLabels(this.#marginHeight, this.#marginWidth, yTitle, maxValueForY, numOfYLabels)
    this.#setXLabels(this.#marginHeight, this.#marginWidth, xTitle, label, false)

    const totalBarWidth = this.#width - this.#marginWidth * 2
    const barWidth = totalBarWidth / label.length * 0.5 // Adjust the bar width (70% of space for each bar)

    for (let i = 0; i < data.length; i++) {
       // Calculate the central position of each label on x
       const labelX = this.#marginWidth + (i + 0.5) * (totalBarWidth / label.length)
      
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

  createLineChart() {
    this.#setYLabels(10, 10)
  }

  #setXLabels (marginHeight, marginWidth, xLabelName, xLabels, isLineChart) {
    // this.#drawAxes(marginHeight, marginWidth)
     const fontSize = this.#height * 0.03
     this.#ctx.font = `${fontSize}px Georgia`; // Set font size
     this.#ctx.textAlign = 'left'
     this.#ctx.fillText(xLabelName, (this.#width - marginWidth) * 1.02, this.#height - marginHeight)
 
     // Check if the type of chart and add or remove the first and last short line
     let xLineUp
     if (isLineChart) {
      xLineUp = (this.#width - 2 * marginWidth) / (xLabels.length - 1)
     } else {
      xLineUp = (this.#width - 2 * marginWidth) / (xLabels.length)
     }
 
     for (let i = 0; i < xLabels.length; i++) {
       const labelX = isLineChart
       ? marginWidth + i * xLineUp
       : marginWidth + (i + 0.5)* xLineUp 
 
       // Create short lines on the x axel to specify the labels
       this.#ctx.beginPath()
       this.#ctx.moveTo(labelX, this.#height - marginHeight - 5)
       this.#ctx.lineTo(labelX, this.#height - marginHeight + 5)
       this.#ctx.stroke()
 
      // Create a title for the labels
       this.#ctx.font = `${this.#height * 0.02}px Georgia`; // Set font size
       this.#ctx.textAlign = 'center'
       this.#ctx.fillText(xLabels[i], labelX, (this.#height - marginHeight) * 1.05)
     }
   }
 
   #setYLabels (marginHeight, marginWidth, yLabel, maxValueForY, yNumOfLabels) {
    // Center the labels
     this.#ctx.textAlign = 'center'
 
     // Style the text
     this.#ctx.font = `${this.#height * 0.03}px Georgia` // Set font size
     this.#ctx.fillText(yLabel, marginWidth, marginHeight / 1.5)
 
     // Loop through each given label
     for (let i = 0; i <= yNumOfLabels; i++) {
       // Calculate the value of the label
       const labelValue = maxValueForY - (maxValueForY/yNumOfLabels * i)
       // Calculate the position
       const labelY = marginHeight + ((this.#height - 2 * marginHeight) / yNumOfLabels) * i
 
       // Create short lines on the y axel to specify the labels
       this.#ctx.beginPath()
       this.#ctx.moveTo(marginWidth - 5, labelY)
       this.#ctx.lineTo(marginWidth + 5, labelY)
       this.#ctx.stroke()
 
       // Create a title for the labels
       this.#ctx.font = `${this.#height * 0.03}px Georgia`
       this.#ctx.textAlign = 'center'
       this.#ctx.fillText(labelValue.toFixed(0), marginWidth * 0.7, labelY)
     }
   }
 
   #drawAxes (marginHeight, marginWidth) {
 
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