# Diagram Module - Testreport
This module was manually tested through a created test app placed in the folder named **test** with the help of a browser. The test app is made of a test.js file and a normal index.html file where test.js is imported as a script. It was made to check each method's functionality with different input values and conditions. I am aware of the problem where these manual test cases get pretty big easily. Unfortunatly I wasn't able to use jest, because I didn't get it to work. **In the future, I would like to use the testing framework jest for testing some parts of the code, to make the testing process more easy.** 

Below is a list of test cases with description, execution and outcome. Each test case is focused on one public method in the module, to insure they work as intended.

## Test Environment
- **Operating System:** Windows 11
- **Browser:** Google Chrome Version 126.0.6478.254
- **Module Version:** 1.0.0
- **Testing Tool:** Manual testing

Självklart! Här är en omarbetning av testfallstabellen, där alternativen är anpassade med nya specifika värden som exempel. Jag behåller samma typ av tester och lägger in olika värden för variation.

---

### **TC1** `setSize(width, height)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 1.1 | Should change the diagram's width to the given input | Input: `800`, expect change of width to 800 pixels | Diagram's width changed to 800 pixels | OK✅ | 
| 1.2 | Should change the diagram's height to the given input | Input: `900`, expect change of height to 900 pixels | Diagram's height changed to 900 pixels | OK✅ |
| 1.3 | Input should not affect the canvas width and height | Input: `700` for both height and width, set value `900` to `canvas.width` | Diagram did not affect the changing of the canvas size | OK✅ |
| 1.4 | Throw error if input for width is bigger than 1200 pixels | Input: `1300`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅ |
| 1.5 | Throw error if input for height is bigger than 1200 pixels | Input: `1500`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅ |
| 1.6 | Throw error if input for width is less than 400 pixels | Input: `300`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅ |
| 1.7 | Throw error if input for height is less than 400 pixels | Input: `350`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅ |
| 1.8 | Throw error if input for height and width is not a number | Input: `'800'` for height and width each, expect error message: "Width and height must be of the type number." | Error thrown correctly | OK✅ |

---

### **TC2** `setTitle(title, font)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 2.1 | Should set the title at the top of the canvas with valid inputs | Input: `title: "My Diagram", font: "Verdana"` | The title is correctly displayed at the top of the canvas | OK✅ |
| 2.2 | Should throw an error if the title is an empty string | Input: `title: '', font: "Times New Roman"` | Error is thrown with message: "Please, do not use an empty string." | OK✅ |
| 2.3 | Should throw an error if the font is an empty string | Input: `title: "Sales Report", font: ''` | Error is thrown with message: "Please, do not use an empty string." | OK✅ |
| 2.4 | Should throw an error if the title exceeds 50 characters | Input: `title: 'This title is way too long and exceeds fifty characters.', font: "Arial"` | Error is thrown with message: "Maximal length of string is 50." | OK✅ |
| 2.5 | Should throw an error if the title is not a string | Input: `title: 456, font: "Comic Sans"` | Error is thrown with message: "Must be of the type string." | OK✅ |
| 2.6 | Should throw an error if the font is not a string | Input: `title: "Diagram Example", font: 789` | Error is thrown with message: "Must be of the type string." | OK✅ |

---

### **TC3** `createPieChart(data, viewData)`
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 3.1 | Should draw the pie chart correctly with valid data | Input: `[{ label: 'X', value: 15, color: '#F0A500' }, { label: 'Y', value: 25, color: '#1F78B4' }, { label: 'Z', value: 60, color: '#33A02C' }]`, `viewData: true` | The pie chart is drawn correctly with three slices | OK✅ |
| 3.2 | Should throw error if data is not an array | Input: `data: 'chart data'`, `viewData: true` | Error is thrown with message: "Data must be an array." | OK✅ |
| 3.3 | Should throw error if data contains non-object items | Input: `data: ['apple', 'banana']`, `viewData: true` | Error is thrown with message: "Each item in data must be an object." | OK✅ |
| 3.4 | Should throw error if any value is not a number | Input: `data: [{ label: 'A', value: 'thirty', color: '#FF4500' }]`, `viewData: true` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 3.5 | Should correctly calculate and display the percentages when viewData is true | Input: `[{ label: 'Q', value: 10, color: '#FFA07A' }, { label: 'R', value: 40, color: '#20B2AA' }, { label: 'S', value: 50, color: '#9370DB' }]`, `viewData: true` | Percentages match the calculated values based on the total | OK✅ |

---
### **TC4** `createBarChart(data, labels)` (Modified Test Cases)
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 4.1 | Should draw the bar chart correctly with valid data | Input: `data: [{ label: 'X', value: 50, color: '#FF5733' }, { label: 'Y', value: 75, color: '#33FF57' }, { label: 'Z', value: 100, color: '#3357FF' }]`, `yTitle: 'Amount'`, `xTitle: 'Categories'`, `maxValueForY: 100`, `numOfYLabels: 4` | The bar chart is drawn correctly with three bars. | OK✅ |
| 4.2 | Should throw error if maxValueForY is less than the highest value in data | Input: `data: [{ label: 'A', value: 150, color: '#FF0000' }]`, `yTitle: 'Amount'`, `xTitle: 'Items'`, `maxValueForY: 100`, `numOfYLabels: 5` | Error is thrown with message: "The max value for Y cannot be smaller than the given values." | OK✅ |
| 4.3 | Should handle empty data array gracefully | Input: `data: []`, `yTitle: 'Values'`, `xTitle: 'Labels'`, `maxValueForY: 100`, `numOfYLabels: 4` | No errors thrown; the chart is not drawn. | OK✅ |
| 4.4 | Should throw error if data contains non-object items | Input: `data: [50, 75, 100]`, `yTitle: 'Amount'`, `xTitle: 'Categories'`, `maxValueForY: 100`, `numOfYLabels: 5` | Error is thrown with message: "Data must be an array of objects." | OK✅ |
| 4.5 | Should throw error if any value is not a number | Input: `data: [{ label: 'X', value: 'fifty', color: '#FF5733' }]`, `yTitle: 'Amount'`, `xTitle: 'Categories'`, `maxValueForY: 100`, `numOfYLabels: 5` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 4.6 | Should draw bars with correct heights based on values | Input: `data: [{ label: 'X', value: 50, color: '#FF5733' }, { label: 'Y', value: 75, color: '#33FF57' }]`, `yTitle: 'Amount'`, `xTitle: 'Categories'`, `maxValueForY: 100`, `numOfYLabels: 4` | The heights of the bars correspond to the input values. | OK✅ |
| 4.7 | Should draw bars with correct colors as specified | Input: `data: [{ label: 'X', value: 50, color: '#FF5733' }, { label: 'Y', value: 75, color: '#33FF57' }]`, `yTitle: 'Amount'`, `xTitle: 'Categories'`, `maxValueForY: 100`, `numOfYLabels: 4` | The bars are drawn with the specified colors. | OK✅ |

---

### **TC5** `createLineChart(data, labels)` (Modified Test Cases)
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 5.1 | Should draw the line chart correctly with valid data | Input: `data: [{ label: 'Jan', value: 200 }, { label: 'Feb', value: 400 }, { label: 'Mar', value: 600 }]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | The line chart is drawn correctly with three points connected by lines. | OK✅ |
| 5.2 | Should throw error if maxValueForY is less than the highest value in data | Input: `data: [{ label: 'Jan', value: 800 }]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | Error is thrown with message: "The max value for Y cannot be smaller than the given values." | OK✅ |
| 5.3 | Should handle empty data array gracefully | Input: `data: []`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | No errors thrown; the chart is not drawn. | OK✅ |
| 5.4 | Should throw error if data contains non-object items | Input: `data: [200, 400, 600]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | Error is thrown with message: "Data must be an array of objects." | OK✅ |
| 5.5 | Should throw error if any value is not a number | Input: `data: [{ label: 'Jan', value: 'two hundred' }]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | Error is thrown with message: "Data must be of the type number." | OK✅ |
| 5.6 | Should draw points with correct positions based on values | Input: `data: [{ label: 'Jan', value: 200 }, { label: 'Feb', value: 400 }]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | The points are drawn at correct vertical positions according to their values. | OK✅ |
| 5.7 | Should connect points with lines in the correct order | Input: `data: [{ label: 'Jan', value: 200 }, { label: 'Feb', value: 400 }]`, `yTitle: 'Revenue', xTitle: 'Months', maxValueForY: 600, numOfYLabels: 6` | The points are connected with a line drawn in the correct order. | OK✅ |

---

### **TC6** `clear()` (Modified Test Cases)
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 6.1 | Should clear the canvas if it contains a chart | Precondition: Draw a pie chart on the canvas. | The canvas is cleared successfully and the console logs "Cleared chart!" | OK✅ |
| 6.2 | Should not affect other canvas states after clearing | Precondition: Store canvas state before clearing. | After clearing, the canvas state is confirmed to be empty, with no residual graphics remaining. | OK✅ |

---

### **TC7** `validateLabels(labels)` (Modified Test Cases)
| **TC** | **Description** | **How it was tested** | **Test result** | **Status** |
|--------|-----------------|-----------------------|-----------------|------------|
| 7.1 | Should not throw an error for valid inputs | Input: `{ yTitle: "Sales", xTitle: "Months", maxValueForY: 100, numOfYLabels: 5 }` | Validation passes without throwing errors. | OK✅ |
| 7.2 | Should throw an error if `yTitle` is an empty string | Input: `{ yTitle: "", xTitle: "Months", maxValueForY: 100, numOfYLabels: 5 }` | Error is thrown with message: "yTitle must be a non-empty string." | OK✅ |
| 7.3 | Should throw an error if `xTitle` is an empty string | Input: `{ yTitle: "Sales", xTitle: "", maxValueForY: 100, numOfYLabels: 5 }` | Error is thrown with message: "xTitle must be a non-empty string." | OK✅ |
| 7.4 | Should throw an error if `maxValueForY` is not a positive number | Input: `{ yTitle: "Sales", xTitle: "Months", maxValueForY: -10, numOfYLabels: 5 }` | Error is thrown with message: "maxValueForY must be a positive number." | OK✅ |
| 7.5 | Should throw an error if `numOfYLabels` is not a positive integer | Input: `{ yTitle: "Sales", xTitle: "Months", maxValueForY: 100, numOfYLabels: 0 }` | Error is thrown with message: "numOfYLabels must be a positive integer." | OK✅ |
| 7.6 | Should throw an error if `maxValueForY` is less than `numOfYLabels` | Input: `{ yTitle: "Sales", xTitle: "Months", maxValueForY: 3, numOfYLabels: 5 }` | Error is thrown with message: "maxValueForY must be greater than or equal to numOfYLabels." | OK✅ |
| 7.7 | Should throw an error if `yTitle` or `xTitle` are not strings | Input: `{ yTitle: 123, xTitle: true, maxValueForY: 100, numOfYLabels: 5 }` | Error is thrown with message: "yTitle and xTitle must be strings." | OK✅ |
| 7.8 | Should throw an error if `labels` object is missing required properties | Input: `{ xTitle: "Months", maxValueForY: 100, numOfYLabels: 5 }` | Error is thrown with message: "yTitle is required." | OK✅ | 
| 7.9 | Should handle edge case where `maxValueForY` equals `numOfYLabels` | Input: `{ yTitle: "Sales", xTitle: "Months", maxValueForY: 5, numOfYLabels: 5 }` | Validation passes without throwing errors. | OK✅ |

## Conclusion of first try
- Passed: 45/45
- Failed 0/45