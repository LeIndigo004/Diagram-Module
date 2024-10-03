/**
 * This file handles the axes of diagrams linechart and barChart.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.0.0
 */

export class Axes {
  #ctx
  #height
  #width
  constructor (canvas, height, width) {
    this.#ctx = canvas
    this.#height = height
    this.#width = width
  }

  setXLabels (marginHeight, marginWidth, xLabelName, xLabels) {
   // this.#drawAxes(marginHeight, marginWidth)
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

      this.#ctx.font = `${this.#height * 0.02}px Georgia`; // Set font size
      this.#ctx.textAlign = 'center'
      this.#ctx.fillText(xLabels[i], labelX, (this.#height - marginHeight) * 1.05)
      console.log(xLabels[i])
    }
  }

  setYLabels (marginHeight, marginWidth, yLabel, maxValueForY, yNumOfLabels) {

   // this.#drawAxes(marginHeight, marginWidth)
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

  drawAxes (marginHeight, marginWidth) {

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