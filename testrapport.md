# Diagram Module - Testreport
This module was manually tested through a created test app placed in the folder named **test** with the help of a browser. The test app is made of a test.js file and a normal index.html file where test.js is imported as a script. It was made to check each method's functionality with different input values and conditions. I am aware of the problem where these manual test cases get pretty big easily. **In the future, I would like to use the testing framework jest for testing some parts of the code.**

Below is a list of test cases with description, execution and outcome. Each test case is focused on one public method in the module, to insure they work as intended.

## Test Environment
- **Operating System:** Windows 11
- **Browser:** Google Chrome Version 126.0.6478.254
- **Module Version:** 1.0.0
- **Testing Tool:** Manual testing

## Test Cases
### **TC1** `setSize(width, heigth)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 1.1 | Should change the diagrams width to the given input | Input: `600`, expect change of width to 600 pixels | Diagrams width changed to 600 pixels | OK✅ | 
| 1.2 | Should change the diagrams height to the given input | Input: `600`, expect change of height to 600 pixels | Diagrams height changed to 600 pixels | OK✅|
| 1.3 | Input should not affect the canvas width and height | Input: `600` to both height and width, set value `800` to `canvas.width` | Diagrams did not affect the changing of the canvas size | OK✅|
| 1.4 | Throw error if input for width is bigger than 1200 pixels | Input: `1201`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅|
| 1.5 | Throw error if input for height is bigger than 1200 pixels | Input: `1201`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅|
| 1.6 | Throw error if input for width is less than 400 pixels | Input: `399`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅|
| 1.7 | Throw error if input for height is less than 400 pixels | Input: `399`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅|
| 1.8 | Throw error if input for height and width is not a number | Input: `'500'` for height and width each, expect error message: "Width and height must be of the type number." | Error thrown correctly, but is also thrown when input is of the type number. | NOK❌ |
| 1.8.1 | Retest after changing the default input from string to number | Input: `'500'` for height and width each, expect error message: "Width and height must be of the type number." | Error thrown correctly | OK✅|

### **TC2** `setTitle(title, font)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 2.1 | Should set the title at the top of the canvas with valid inputs | Input: `title: "Analysis of Students", font: "Arial"` | The title is correctly displayed at the top of the canvas. | OK✅ |
| 2.2 | Should throw an error if the title is an empty string | Input: `title: '', font: "Arial"` | Error is thrown with message: "Please, do not use an empty string." | OK✅ |
| 2.3 | Should throw an error if the font is an empty string | Input: `title: "Analysis of Students", font: ''` | Error is thrown with message: "Please, do not use an empty string." | OK✅ |
| 2.4 | Should throw an error if the title exceeds 50 characters | Input: `title: 'A'.repeat(51), font: "Arial"` | Error is thrown with message: "Maximal length of string is 50." | OK✅ |
| 2.5 | Should throw an error if the title is not a string | Input: `title: 123, font: "Arial"` | Error is thrown with message: "Must be of the type string." | OK✅ |
| 2.6 | Should throw an error if the font is not a string | Input: `title: "Analysis of Students", font: 123` | Error is thrown with message: "Must be of the type string." | OK✅ |


### **TC3** `createPieChart(data, viewData)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 3.1 | Should draw the pie chart correctly with valid data | Input: `[{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }, { label: 'C', value: 30, color: '#0000FF' }]`, `viewData: true` | The pie chart is drawn correctly with three slices. | OK✅ |
| 3.2 | Should throw error if data is not an array | Input: `data: 'invalid data'`, `viewData: true` | Error is thrown with message: "Data must be an array." | OK✅ |
| 3.3 | Should throw error if data contains non-object items | Input: `data: [10, 20, 30]`, `viewData: true` | Error is thrown with message: "Each item in data must be an object." | OK✅ |
| 3.4 | Should throw error if any value is not a number | Input: `data: [{ label: 'A', value: 'not a number', color: '#FF0000' }]`, `viewData: true` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 3.5 | Should correctly calculate and display the percentages when viewData is true | Input: `data: [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 30, color: '#00FF00' }, { label: 'C', value: 60, color: '#0000FF' }]`, `viewData: true` | The displayed percentages match the calculated values based on the total. | OK✅ |
| 3.6 | Should not display the percentages when viewData is false | Input: `data: [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 30, color: '#00FF00' }, { label: 'C', value: 60, color: '#0000FF' }]`, `viewData: false` | The pie chart is drawn without displaying the percentages. | OK✅ |
| 3.7 | Should handle empty data array gracefully | Input: `data: []`, `viewData: true` | No errors thrown; the chart is not drawn. | OK✅ |

### **TC4** `createBarChart(data, labels)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 4.1 | Should draw the bar chart correctly with valid data | Input: `data: [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }, { label: 'C', value: 30, color: '#0000FF' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The bar chart is drawn correctly with three bars. | OK✅ |
| 4.2 | Should throw error if maxValueForY is less than the highest value in data | Input: `data: [{ label: 'A', value: 40, color: '#FF0000' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "The max value for Y cannot be smaller than the given values." | OK✅ |
| 4.3 | Should handle empty data array gracefully | Input: `data: []`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | No errors thrown; the chart is not drawn. | OK✅ |
| 4.4 | Should throw error if data contains non-object items | Input: `data: [10, 20, 30]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "Data must be an array of objects." | OK✅ |
| 4.5 | Should throw error if any value is not a number | Input: `data: [{ label: 'A', value: 'not a number', color: '#FF0000' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 4.6 | Should draw bars with correct heights based on values | Input: `data: [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The heights of the bars correspond to the input values. | OK✅ |
| 4.7 | Should draw bars with correct colors as specified | Input: `data: [{ label: 'A', value: 10, color: '#FF0000' }, { label: 'B', value: 20, color: '#00FF00' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The bars are drawn with the specified colors. | OK✅ |

### **TC5** `createLineChart(data, labels)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 5.1 | Should draw the line chart correctly with valid data | Input: `data: [{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 30 }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The line chart is drawn correctly with three points connected by lines. | OK✅ |
| 5.2 | Should throw error if maxValueForY is less than the highest value in data | Input: `data: [{ label: 'A', value: 40 }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "The max value for Y cannot be smaller than the given values." | OK✅ |
| 5.3 | Should handle empty data array gracefully | Input: `data: []`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | No errors thrown; the chart is not drawn. | OK✅ |
| 5.4 | Should throw error if data contains non-object items | Input: `data: [10, 20, 30]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "Data must be an array of objects." | OK✅ |
| 5.5 | Should throw error if any value is not a number | Input: `data: [{ label: 'A', value: 'not a number' }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 5.6 | Should draw points with correct positions based on values | Input: `data: [{ label: 'A', value: 10 }, { label: 'B', value: 20 }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The points are drawn at correct vertical positions according to their values. | OK✅ |
| 5.7 | Should connect points with lines in the correct order | Input: `data: [{ label: 'A', value: 10 }, { label: 'B', value: 20 }]`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 30`, `numOfYLabels: 5` | The points are connected with a line drawn in the correct order. | OK✅ |

### **TC6** `clear()`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 6.1 | Should clear the canvas if it contains a chart | Precondition: Draw a chart on the canvas. | The canvas is cleared successfully and the console logs "Cleared chart!" | OK✅ |
| 6.2 | Should throw an error if the canvas is already cleared | Precondition: Clear the canvas first. | Error is thrown with message: "Canvas is already cleared" | OK✅ |
| 6.3 | Should not affect other canvas states after clearing | Precondition: Store canvas state before clearing. | After clearing, the canvas state is confirmed to be empty, with no residual graphics remaining. | OK✅ |
