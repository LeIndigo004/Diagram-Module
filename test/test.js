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
  const data = [{ label: 'X', value: 15, color: '#F0A500' }, { label: 'Y', value: 25, color: '#1F78B4' }, { label: 'Z', value: 60, color: '#33A02C' }]
  newDiagram.setSize(600, 600)
  newDiagram.setTitle('My Diagram', 'Comic Sans')
  
  return newDiagram.createPieChart(data, true)
}

function barchart () {
  const data2 = [{ label: 'X', value: 50, color: '#FF5733' }, { label: 'Y', value: 75, color: '#33FF57' }, { label: 'Z', value: 100, color: '#3357FF' }]
  newDiagram.setSize(600, 400)
  newDiagram.setTitle('People', 'helvetica')
  newDiagram.createBarChart(data2, {yTitle: 'Amount', xTitle: 'Categories', maxValueForY: 100, numOfYLabels: 4})
  
}
function linechart () {
  const data3 = [{ label: 'Jan', value: 200 }, { label: 'Feb', value: 400 }, { label: 'Mar', value: 600 }]
  newDiagram.setSize(500, 500)
  newDiagram.setTitle('Cost', 'helvetica')
  
  newDiagram.createLineChart(data3, {yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6})
}

// a static test
const staticDiagram = new DiagramModule('canvas2')

const data4 = [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }, { label: 'C', value: 30, color: '#0000FF' }]
staticDiagram.setSize(500, 500)
staticDiagram.setTitle('En undersökning', 'arial')
staticDiagram.createBarChart(data4, {yTitle: 'mängd', xTitle: 'dagar', maxValueForY: 60, numOfYLabels: 6})
