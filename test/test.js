import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')

// Set the size of the diagram
newDiagram.setSize('1000', '800')

newDiagram.setTitle('Diagram', 50, 60)
const data = [50, 180, 103]
newDiagram.createPieChart(data, ['blue', 'red', 'green'])
