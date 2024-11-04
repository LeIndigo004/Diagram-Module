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
  #displayValue
  constructor (ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
  }

    /**
   * Creates a pie chart which takes data and colors as parameters.
   *
   * @param {Object[]} data - The given data.
   * @param {boolean} viewData - Views the percentage if true.
   */
    drawChart (data, viewData) {
      const sortedData = data.sort((a, b) => a.value - b.value)
      const value = sortedData.map(item => item.value)
      // Get the percent of each value
      const total = value.reduce((sum, value) => sum + value, 0)
      let startAngle = 0
  
      const centralX = this.#width * 0.65
      const centralY = this.#height / 2
      const radius = this.#width / 4
  
      for (let i = 0; i < sortedData.length; i++) {
        const sliceAngle = value[i] / total * 2 * Math.PI
        const endAngle = startAngle + sliceAngle
        this.#ctx.beginPath()
        // create slice of pie chart
        this.#ctx.moveTo(centralX, centralY)
        this.#ctx.arc(centralX, centralY, radius, startAngle, endAngle)
        this.#ctx.closePath()

        this.#setLabels(i, sortedData, total, viewData)
        
  
        startAngle = endAngle
      }
    }

    #setLabels (index, data, total, viewData) {
      if (viewData === true) {
        this.#displayValue = (data[index].value/ total * 100).toFixed(2) + '%'
      } else if (viewData === false) {
        this.#displayValue = data[index].value
      } else {
        throw new Error('Invalid viewData input.')
      }
        const textPosition = this.#height * 0.2 + (index * (this.#height * 0.06))
        this.#ctx.font = `${this.#height * 0.025}px Helvetica`
        this.#ctx.textAlign = 'left'
        this.#ctx.fillStyle = 'black'
        this.#ctx.fillText(`${data[index].label.charAt(0).toUpperCase() + data[index].label.slice(1)}: ${this.#displayValue}`, 
        this.#width * 0.065, textPosition)
        console.log(data[index].color)
  
        // Small dots beside labels
        this.#ctx.arc(this.#width * 0.04, textPosition - 8, 8, 0, 2 * Math.PI)
        this.#ctx.fillStyle = data[index].color
        this.#ctx.fill()
    }
}