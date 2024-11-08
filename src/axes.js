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
  #marginHeight
  #marginWidth
  constructor (canvas, height, width) {
    this.#ctx = canvas
    this.#height = height
    this.#width = width
  }

  drawLabels(yTitle, xTitle, label, maxValueForY, numOfYLabels, isLineChart) {
    this.#marginHeight = this.#height * 0.2
    this.#marginWidth = this.#width * 0.2

    // Get the axes and its labels
    this.#drawAxes(this.#marginHeight, this.#marginWidth)
    this.#setYLabels(this.#marginHeight, this.#marginWidth, yTitle, maxValueForY, numOfYLabels)
    this.#setXLabels(this.#marginHeight, this.#marginWidth, xTitle, label, isLineChart)
  }

  #setXLabels (marginHeight, marginWidth, xLabelName, xLabels, isLineChart) {
    // this.#drawAxes(marginHeight, marginWidth)
     const fontSize = this.#height * 0.03
     this.#ctx.font = `bold ${fontSize}px Lucida Console`; // Set font size
     this.#ctx.fillStyle = 'black'
     this.#ctx.textAlign = 'left'
     this.#ctx.fillText(xLabelName, (this.#width - marginWidth) * 1.02, this.#height - marginHeight)
 
     for (let i = 0; i < xLabels.length; i++) {
      let labelX
       
      // Check if the type of chart and add or remove the first and last short line
      if (isLineChart) {
       labelX = marginWidth + i * (this.#width - 2 * marginWidth) / (xLabels.length - 1)
      } else {
       labelX = marginWidth + (i + 0.5) * (this.#width - 2 * marginWidth) / (xLabels.length)
      } 
 
       // Create short lines on the x axel to specify the labels
       this.#ctx.beginPath()
       this.#ctx.moveTo(labelX, this.#height - marginHeight - 5)
       this.#ctx.lineTo(labelX, this.#height - marginHeight + 5)
       this.#ctx.stroke()
 
      // Create a title for the labels
       this.#ctx.font = `${this.#height * 0.02}px Lucida Console`; // Set font size
       this.#ctx.fillStyle = 'black'
       this.#ctx.textAlign = 'center'
       this.#ctx.fillText(xLabels[i], labelX, (this.#height - marginHeight) * 1.05)
     }
   }

   #setYLabels (marginHeight, marginWidth, yLabel, maxValueForY, yNumOfLabels) {
    // Center the labels
     this.#ctx.textAlign = 'center'
 
     // Style the text
     this.#ctx.font = `bold ${this.#height * 0.03}px Lucida Console` // Set font size
     this.#ctx.fillStyle = 'black'
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
       this.#ctx.font = `${this.#height * 0.03}px Lucida Console`
       this.#ctx.fillStyle = 'black'
       this.#ctx.textAlign = 'center'
       this.#ctx.fillText(labelValue.toFixed(0), marginWidth - 60, labelY)
     }
   }

   #drawAxes (marginHeight, marginWidth) {

    // x axel
    this.#ctx.beginPath()
    this.#ctx.moveTo(marginWidth, this.#height - marginHeight)
    this.#ctx.lineTo(this.#width - marginWidth, this.#height - marginHeight)
    console.log('X-axeln start:', marginWidth, this.#height - marginHeight);
    console.log('X-axeln slut:', this.#width - marginWidth, this.#height - marginHeight);


    // y axel
    this.#ctx.moveTo(marginWidth, this.#height - marginHeight)
    this.#ctx.lineTo(marginWidth, marginHeight)
    this.#ctx.stroke()
    console.log('Y-axeln start:', marginWidth, this.#height - marginHeight);
    console.log('Y-axeln slut:', marginWidth, marginHeight);
  }
}