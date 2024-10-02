import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')

// Set the size of the diagram
newDiagram.setSize('1000', '1000')

newDiagram.setTitle('Diagram', 10, 12)
const data = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'december'
]
newDiagram.createBarChart('Days', data, 'Tempature (C)','900', 3)
