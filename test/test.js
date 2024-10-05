import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')
const newCircleDiagram = new DiagramModule('circle-id')

// Set the size of the diagram


const data = [
  {label: 'apelsin', value: 1, color: 'orange'},
  {label: 'äpple', value: 5, color: 'red'},
  {label: 'banana', value: 7, color: 'yellow'}
]

newDiagram.createBarChart(data,'Students', 'fruits', 10, 5)

newCircleDiagram.setSize(600, 600)

newCircleDiagram.setTitle('Diagram 2', 'Arial')

newCircleDiagram.createPieChart(data)