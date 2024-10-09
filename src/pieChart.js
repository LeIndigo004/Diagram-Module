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
      const value = data.map(item => item.value)

      value.sort((a, b) => a - b)

      // Get the percent of each value
      const total = value.reduce((sum, value) => sum + value, 0)
      let startAngle = 0
  
      const centralX = this.#width * 0.65
      const centralY = this.#height / 2
      const radius = this.#width / 4
  
      for (let i = 0; i < data.length; i++) {
        if (typeof value[i] !== 'number') {
          throw new Error('Data must be of the type number')
        }
        const sliceAngle = value[i] / total * 2 * Math.PI
        const endAngle = startAngle + sliceAngle
        this.#ctx.beginPath()
        // create slice of pie chart
        this.#ctx.moveTo(centralX, centralY)
        this.#ctx.arc(centralX, centralY, 200, startAngle, endAngle)
        this.#ctx.closePath()

        this.#setLabels(i, data, total)
  
        startAngle = endAngle
      }
    }

    #setLabels (index, data, total) {
        const textPosition = this.#height * 0.15 + (index * (this.#height * 0.07))
        this.#ctx.font = `bold ${this.#height * 0.025}px Lucida Console`
        this.#ctx.textAlign = 'left'
        this.#ctx.fillStyle = 'black'
        this.#ctx.fillText(`${data[index].label.charAt(0).toUpperCase() + data[index].label.slice(1)}: ${
        (data[index].value/ total * 100).toFixed(2)}%`, 
        this.#width * 0.065, textPosition)
  
        // Small dots beside labels
        this.#ctx.arc(this.#width * 0.04, textPosition * 0.96, 8, 0, 2 * Math.PI)
        this.#ctx.fillStyle = data[index].color
        this.#ctx.fill()
    }
}