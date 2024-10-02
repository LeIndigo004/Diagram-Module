import { DiagramModule } from "../src/diagramModule.js"

const newDiagram = new DiagramModule('diagram-id')

// Set the size of the diagram
newDiagram.setSize('800', '400')

newDiagram.setTitle('Diagram', 10, 10)
const data = [50, 180, 103, 50, 100]
newDiagram.createBarChart()
