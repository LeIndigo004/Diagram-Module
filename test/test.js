import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')

// Set the size of the diagram
newDiagram.setSize('1000', '1000')

newDiagram.setTitle('Diagram', 'Arial')
const data = [
  {label: 'apelsin', value: 20, color: 'orange'},
  {label: 'äpple', value: 10, color: 'red'},
  {label: 'banana', value: 30, color: 'yellow'},
  {label: 'pear', value: 60, color: 'green'}
]

newDiagram.createBarChart(data,'Tempature (C)','60', 12)
