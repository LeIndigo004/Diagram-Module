import { DiagramModule } from "../src/diagramModule.js"

const newCircleDiagram = new DiagramModule('circle-id')

// Set the size of the diagram

const data = [
  {label: 'apelsin', value: 10, color: 'orange'},
  {label: 'äpple', value: 5, color: 'red'},
  {label: 'banana', value: 7, color: 'yellow'}
]



newCircleDiagram.setSize(1000, 600)
newCircleDiagram.setTitle('Diagram 2', 'Lucida Console')

newCircleDiagram.createPieChart(data)