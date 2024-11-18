/**
 * This file handles the axes of diagrams linechart and barChart.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class Axes {
  #canvasContext
  #height
  #width
  #xMargin
  #yMargin

  constructor(canvasContext, height, width) {
    this.#canvasContext = canvasContext
    this.#height = height
    this.#width = width
  }

  drawLabels(yTitle, xTitle, xLabels, maxValueForY, numOfYLabels, isLineChart) {
    this.#calculateMargins()
    this.#renderAxes()
    this.#renderYLabels(yTitle, maxValueForY, numOfYLabels)
    this.#renderXLabels(xTitle, xLabels, isLineChart)
  }

  #calculateMargins() {
    this.#yMargin = this.#height * 0.2
    this.#xMargin = this.#width * 0.2
  }

  #renderAxes() {
    this.#canvasContext.beginPath()

    // x-axel
    this.#canvasContext.moveTo(this.#xMargin, this.#height - this.#yMargin)
    this.#canvasContext.lineTo(this.#width - this.#xMargin, this.#height - this.#yMargin)

    // y-axel
    this.#canvasContext.moveTo(this.#xMargin, this.#height - this.#yMargin)
    this.#canvasContext.lineTo(this.#xMargin, this.#yMargin)

    this.#canvasContext.stroke()
  }

  #renderYLabels(yTitle, maxValueForY, numOfYLabels) {
    this.#canvasContext.textAlign = 'center'

    this.#canvasContext.font = `bold ${this.#height * 0.03}px Lucida Console`
    this.#canvasContext.fillStyle = 'black'
    this.#canvasContext.fillText(yTitle, this.#xMargin, this.#yMargin / 1.5)

    for (let i = 0; i <= numOfYLabels; i++) {
      const labelValue = maxValueForY - (maxValueForY / numOfYLabels * i)
      const labelY = this.#yMargin + ((this.#height - 2 * this.#yMargin) / numOfYLabels) * i

      this.#canvasContext.beginPath()
      this.#canvasContext.moveTo(this.#xMargin - 5, labelY)
      this.#canvasContext.lineTo(this.#xMargin + 5, labelY)
      this.#canvasContext.stroke()

      this.#canvasContext.font = `${this.#height * 0.03}px Lucida Console`
      this.#canvasContext.fillStyle = 'black'
      this.#canvasContext.textAlign = 'center'
      this.#canvasContext.fillText(labelValue.toFixed(0), this.#xMargin - 60, labelY)
    }
  }

  #renderXLabels(xTitle, xLabels, isLineChart) {
    const fontSize = this.#height * 0.03
    this.#canvasContext.font = `bold ${fontSize}px Lucida Console`
    this.#canvasContext.fillStyle = 'black'
    this.#canvasContext.textAlign = 'left'
    this.#canvasContext.fillText(xTitle, (this.#width - this.#xMargin) * 1.02, this.#height - this.#yMargin)

    for (let i = 0; i < xLabels.length; i++) {
      let labelX

      if (isLineChart) {
        labelX = this.#xMargin + i * (this.#width - 2 * this.#xMargin) / (xLabels.length - 1)
      } else {
        labelX = this.#xMargin + (i + 0.5) * (this.#width - 2 * this.#xMargin) / (xLabels.length)
      }

      this.#canvasContext.beginPath()
      this.#canvasContext.moveTo(labelX, this.#height - this.#yMargin - 5)
      this.#canvasContext.lineTo(labelX, this.#height - this.#yMargin + 5)
      this.#canvasContext.stroke()

      this.#canvasContext.font = `${this.#height * 0.02}px Lucida Console`
      this.#canvasContext.fillStyle = 'black'
      this.#canvasContext.textAlign = 'center'
      this.#canvasContext.fillText(xLabels[i], labelX, (this.#height - this.#yMargin) * 1.05)
    }
  }
}