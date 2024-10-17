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
// Set the size of the diagram



function piechart () {
  const data = [
    { label: 'Blueberry', value: 5, color: '#4F86F7' },
    { label: 'Strawberry', value: 18, color: '#FF43A4' },
    { label: 'Pineapple', value: 8, color: '#F5E050' },
    { label: 'Kiwi', value: 6, color: '#7CFC00' },
    { label: 'Peach', value: 9, color: '#FFCC99' }
]
  newDiagram.setSize(600, 600)
  newDiagram.setTitle('Analysis of students', 'Helvetica')
  
  return newDiagram.createPieChart(data, 'amount')
}

function barchart () {
  const data2 = [
    { label: 'Blueberry', value: 5, color: '#4F86F7' },
    { label: 'Strawberry', value: 18, color: '#FF43A4' },
    { label: 'Pineapple', value: 8, color: '#F5E050' },
    { label: 'Kiwi', value: 6, color: '#7CFC00' },
    { label: 'Peach', value: 9, color: '#FFCC99' }
  ]
  newDiagram.setSize(1000, 600)
  newDiagram.setTitle('Undersökning angående favoritfrukt', 'helvetica')
  newDiagram.createBarChart(data2, {yTitle: 'Students', xTitle: 'Fruits', maxValueForY: 20, numOfYLabels: 10})
  
}
function linechart () {
  const data3 = [
    { label: 'Måndag', value: 13, color: '#4F86F7' },
    { label: 'Tisdag', value: 18, color: '#FF43A4' },
    { label: 'Onsdag', value: 8, color: '#F5E050' },
    { label: 'Torsdag', value: 6, color: '#7CFC00' },
    { label: 'Fredag', value: 9, color: '#FFCC99' }
  ]
  newDiagram.setSize(800, 500)
  newDiagram.setTitle('Undersökning angående favoritfrukt', 'helvetica')
  
  newDiagram.createLineChart(data3, {yTitle: '', xTitle: 'Dagar', maxValueForY: 20, numOfYLabels: 10})
}
