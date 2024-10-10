import { DiagramModule } from "../src/diagramModule.js"

const newCircleDiagram = new DiagramModule('circle-id')

// Set the size of the diagram

const data = [
    { label: 'Blueberry', value: 5, color: '#4F86F7' },
    { label: 'Strawberry', value: 18, color: '#FF43A4' },
    { label: 'Pineapple', value: 8, color: '#F5E050' },
    { label: 'Kiwi', value: 6, color: '#7CFC00' },
    { label: 'Peach', value: 9, color: '#FFCC99' }
]
console.log('Innan sortering: ', data)
newCircleDiagram.setSize(1000, 1000)
newCircleDiagram.setTitle('Undersökning angående favoritfrukt', 'helvetica')

newCircleDiagram.createPieChart(data, 'percent')