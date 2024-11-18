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

  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
  }

  /**
   * Draws a pie chart based on provided data and configuration.
   *
   * @param {Object[]} data - Array of objects containing `label`, `value`, and `color`.
   * @param {boolean} displayValueInPercent - If true, displays percentages; otherwise, displays raw values.
   */
  drawChart(data, displayValueInPercent) {
    const sortedData = this.#sortDataByValue(data)
    const total = this.#calculateTotal(sortedData)
    const { centralX, centralY, radius } = this.#calculateChartDimensions()

    this.#drawSlices(sortedData, total, centralX, centralY, radius, displayValueInPercent)
  }

  #sortDataByValue(data) {
    return data.sort((a, b) => a.value - b.value)
  }

  #calculateTotal(data) {
    return data.reduce((sum, item) => sum + item.value, 0)
  }

  #calculateChartDimensions() {
    return {
      centralX: this.#width * 0.65,
      centralY: this.#height / 2,
      radius: this.#width / 4
    }
  }

  #drawSlices(data, total, centralX, centralY, radius, viewData) {
    let startAngle = 0

    data.forEach((item, index) => {
      const sliceAngle = this.#calculateSliceAngle(item.value, total)
      const endAngle = startAngle + sliceAngle

      this.#drawSlice(centralX, centralY, radius, startAngle, endAngle, item.color)
      this.#drawLabels(index, data, total, viewData)

      startAngle = endAngle
    })
  }

  #calculateSliceAngle(value, total) {
    return (value / total) * 2 * Math.PI
  }

  #drawSlice(centralX, centralY, radius, startAngle, endAngle, color) {
    this.#ctx.beginPath()
    this.#ctx.moveTo(centralX, centralY)
    this.#ctx.arc(centralX, centralY, radius, startAngle, endAngle)
    this.#ctx.closePath()
    this.#ctx.fillStyle = color
    this.#ctx.fill()
  }

  #drawLabels(index, data, total, displayValueInPercent) {
    const displayValue = this.#calculateDisplayValue(data[index], total, displayValueInPercent)
    const textPosition = this.#calculateLabelPosition(index)
    this.#drawLabelText(data[index].label, displayValue, textPosition)
    this.#drawLabelDot(data[index].color, textPosition)
  }

  #calculateDisplayValue(item, total, displayValueInPercent) {
    if (displayValueInPercent) {
      return `${((item.value / total) * 100).toFixed(2)}%`
    } else if (displayValueInPercent === false) {
      return item.value
    }
    throw new Error('Invalid input. Must be a boolean')
  }

  #calculateLabelPosition(index) {
    return this.#height * 0.2 + (index * (this.#height * 0.06))
  }

  #drawLabelText(label, value, position) {
    this.#ctx.font = `${this.#height * 0.025}px Helvetica`
    this.#ctx.textAlign = 'left'
    this.#ctx.fillStyle = 'black'
    this.#ctx.fillText(`${this.#capitalize(label)}: ${value}`, this.#width * 0.065, position)
  }

  #drawLabelDot(color, position) {
    this.#ctx.beginPath()
    this.#ctx.arc(this.#width * 0.04, position - 8, 8, 0, 2 * Math.PI)
    this.#ctx.fillStyle = color
    this.#ctx.fill()
  }

  #capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
