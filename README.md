# Diagram-Module
**DiagramModule** is a JavaScript library that provides functionality for creating customizable charts (Pie, Bar, and Line charts) on an HTML5 canvas. This library is suitable for projects where simple, configurable data visualization is required.

## How to install
Install the package from npm:

```bash
npm install diagram-module

```

## Example Usage

### Import and Initialize
After installation, you can import and use the `DiagramModule` in your project.

- **Parameters:**
   - `canvasId` (string): The ID of your canvas element.

```JavaScript
import { DiagramModule } from 'diagram-module';

const diagram = new DiagramModule('canvasId');

```
### `setSize(width, height)`
Sets the width and height of the diagram (not the canvas). Minimum size is 400x400px, and maximum is 1200x1200px.
- **Parameters:**
   - `width`(number): The width of the diagram.
   - `height` (number): The height of the diagram.

```JavaScript
diagram.setSize(600, 600);

```
### `setTitle(title, font)`
Sets the title of the diagram with the specified font.
- **Parameters:**
   - `title`(string):  The title of the chart (maximum 50 characters).
   - `font` (string): The font to use (e.g., "Arial", "Helvetica").

```JavaScript
diagram.setTitle('Sales Data', 'Arial');

```
### `createPieChart(data, viewData)`
Creates a pie chart with the provided data.
- **Parameters:**
   - `data`(Array of Objects): An array of objects where each object has a label, a value, and a color property.
   - `viewData` (boolean): Whether to display values as quantities or percentages.

```JavaScript
const data = [
  { label: 'Product A', value: 30, color: '#FF0000' },
  { label: 'Product B', value: 50, color: '#00FF00' },
  { label: 'Product C', value: 20, color: '#0000FF' }
];
diagram.createPieChart(data, true);

```

### `createBarChart(data, labels)`
Creates a bar chart with the provided data and labels.
- **Parameters:**
   - `data`(Array of Objects): An array of objects where each object has a label, a value, and a color property.
   - `labels` (Object): Contains yTitle, xTitle, maxValueForY, and numOfYLabels.

```JavaScript
const barData = [
  { label: 'Q1', value: 150, color: '#FFA500' },
  { label: 'Q2', value: 200, color: '#FF4500' }
];
const barLabels = { yTitle: 'Revenue', xTitle: 'Quarters', maxValueForY: 250, numOfYLabels: 5 };
diagram.createBarChart(barData, barLabels);

```
### `createLineChart(data, labels)`
Creates a line chart with the provided data and labels.
- **Parameters:**
   - `data`(Array of Objects): An array of objects where each object has a label, a value, and a color property.
   - `labels` (Object): Contains yTitle, xTitle, maxValueForY, and numOfYLabels.

```JavaScript
const lineData = [
  { label: 'January', value: 120, color: '#32CD32' },
  { label: 'February', value: 140, color: '#32CD32' }
];
const lineLabels = { yTitle: 'Sales', xTitle: 'Months', maxValueForY: 200, numOfYLabels: 4 };
diagram.createLineChart(lineData, lineLabels);

```

### `clear()`
Clears the canvas. Logs a message if the canvas is already cleared.
```JavaScript
diagram.clear();

```
## Testing
This project includes a test app where the module has been manually tested.

## Dependencies
- Languages: JavaScript (ES6+)
- Library/Environment: HTML5 Canvas API

## Bug Reports
If you find any bugs, please open an issue on the GitHub repository.

## Contributing
Please open a pull request on the GitHub repository if you would like to contribute to the library.

## License
This library is licensed under the MIT license.

