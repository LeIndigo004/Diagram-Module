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
| 2.1 | Should view the title at the top of the canvas with given correct input | Input: `Title: Analysis of students` | The given input is viewed as a title correctly. | OK✅ |
| 2.2 | Throw error if the given string is an empty string | Input: `''`, expect error message: "Please, do not use an empty string." | Error is thrown correctly | OK✅ |
| 2.4 | Should change the font of the title if given an existing font | Input: `Helvetica`, excpect changing of font to helvetica | The title changed to the given font. | OK✅ |
| 2.5 | Should change the font of the title if given an existing font | Input: `Helvetica`, excpect changing of font to helvetica | The title changed to the given font. | OK✅ |
| 2.6 | Should change the font of the title if given an existing font | Input: `Helvetica`, excpect changing of font to helvetica | The title changed to the given font. | OK✅ |

