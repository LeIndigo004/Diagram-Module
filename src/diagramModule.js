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
    const maxHeight = 800

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

  setTitle (title, size, placement) {
    // If the given string is empty.
    if (title === '') {
      throw new Error('Please, do not use an empty string as a title.')
    // If the given string has a length longer than 50.
    } else if (title.length > 50) {
      throw new Error('Maximal length of string is 50.')
    } else {
      this.#ctx.font = `${size}px Georgia`
      this.#ctx.fillText(title, this.#width / 2, placement) // try to center text
    }  
  }

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
}