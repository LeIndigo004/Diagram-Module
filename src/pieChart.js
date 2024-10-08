/**
 * This file handles the pieChart of the diagram.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class PieChart {
  #ctx
  #height
  #width
  constructor (ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
  }

    /**
   * Creates a pie chart which takes data and colors as parameters.
   *
   * @param {Object[]} data - The given data.
   * @param {string[]} colors - The given colors
   */
    drawChart (data) {
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
        if (typeof value[i] !== 'number') {
          throw new Error('Data must be of the type number')
        }
        const sliceAngle = value[i] / total * 2 * Math.PI
        const endAngle = startAngle + sliceAngle
        const textPosition = this.#height * 0.15 + (i * (this.#height * 0.07))
        this.#ctx.beginPath()
        // create slice of pie chart
        this.#ctx.moveTo(centralX, centralY)
        this.#ctx.arc(centralX, centralY, radius, startAngle, endAngle)
        this.#ctx.closePath()
  
        // The labels
        this.#ctx.font = `bold ${this.#height * 0.025}px Lucida Console`
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
}