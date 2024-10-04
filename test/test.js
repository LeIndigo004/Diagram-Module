import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')
const newCircleDiagram = new DiagramModule('circle-id')

// Set the size of the diagram
newDiagram.setSize(600,600)

newDiagram.setTitle('Diagram', 'Arial')
const data = [
  {label: 'apelsin', value: 1, color: 'orange'},
  {label: 'äpple', value: 2, color: 'red'},
  {label: 'banana', value: 5, color: 'yellow'}
]

newDiagram.createBarChart(data,'Students', 'fruits', 10, 5)

newCircleDiagram.setSize(400, 400)

newCircleDiagram.setTitle('Diagram 2', 'Arial')

newCircleDiagram.createPieChart(data)