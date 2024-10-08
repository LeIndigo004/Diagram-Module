import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')
const newCircleDiagram = new DiagramModule('circle-id')

// Set the size of the diagram

newDiagram.setSize(700, 500)

const data = [
  {label: 'apelsin', value: 1, color: 'orange'},
  {label: 'äpple', value: 5, color: 'red'},
  {label: 'banana', value: 7, color: 'yellow'}
]

newDiagram.createLineChart(data,'Students', 'Fruits', 10, 10)


newCircleDiagram.setSize(600, 1000)
newCircleDiagram.setTitle('Diagram 2', 'Lucida Console')

newCircleDiagram.createPieChart(data)