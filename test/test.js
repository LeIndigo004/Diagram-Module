import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('canvas-id')

const pieButton = document.getElementById('pie-button')

pieButton.addEventListener('click', piechart)
const barButton = document.getElementById('bar-button')

barButton.addEventListener('click', barchart)
const lineButton = document.getElementById('line-button')

lineButton.addEventListener('click', linechart)

const clearButton = document.getElementById('clear')

clearButton.addEventListener('click', () => newDiagram.clear())



function piechart () {
  const data = [{ label: 'A', value: 3, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }, { label: 'C', value: 30, color: '#0000FF' }]
  newDiagram.setSize(600, 600)
  newDiagram.setTitle('Analysis of students', 'Helvetica')
  
  return newDiagram.createPieChart(data, true)
}

function barchart () {
  const data2 = [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }, { label: 'C', value: 30, color: '#0000FF' }]
  newDiagram.setSize(600, 400)
  newDiagram.setTitle('Undersökning angående favoritfrukt', 'helvetica')
  newDiagram.createBarChart(data2, {yTitle: 'Values', xTitle: 'Labels', maxValueForY: 30, numOfYLabels: 5})
  
}
function linechart () {
  const data3 = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 30 }]
  newDiagram.setSize(500, 500)
  newDiagram.setTitle('Undersökning angående favoritfrukt', 'helvetica')
  
  newDiagram.createLineChart(data3, {yTitle: '', xTitle: '', maxValueForY: 30, numOfYLabels: 3})
}
