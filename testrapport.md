# Diagram Module - Testreport
This module was manually tested through a created test app placed in the folder named **test** with the help of a browser. The test app is made of a test.js file and a normal index.html file where test.js is imported as a script. It was made to check each method's functionality with different input values and conditions.  

Below is a list of test cases with description, execution and outcome. Each test case is focused on one public method in the module, to insure they work as intended.

## Test Environment
- **Operating System:** Windows 11
- **Browser:** Google Chrome Version 126.0.6478.254
- **Module Version:** 1.0.0
- **Testing Tool:** Manual testing

## Test Cases
### **TC1** `setSize(width, heigth)`
| TC | Description | How it was tested | Test result | Status |
|----|-------------|-------------------|-------------|--------|
| 1.1 | Should change width to the given input | Input: `600`, expect change of width to 600 pixels | Canvas width changed to 600 pixels | OK✅ | 
| 1.2 | Should change height to the given input | Input: `600`, expect change of height to 600 pixels | Canvas height changed to 600 pixels | OK✅|
| 1.3 | Throw error if input for width is bigger than 1200 pixels | Input: `1201`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅|
| 1.4 | Throw error if input for height is bigger than 1200 pixels | Input: `1201`, expect error message: "Width and height cannot exceed `1200px`." | Error thrown correctly | OK✅|
| 1.5 | Throw error if input for width is less than 400 pixels | Input: `399`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅|
| 1.6 | Throw error if input for height is less than 400 pixels | Input: `399`, expect error message: "Width and height cannot be less than `400px`." | Error thrown correctly | OK✅|
| 1.7 | Throw error if input for height and width is not a number | Input: `'500'` for height and width each, expect error message: "Width and height must be of the type number." | Error thrown correctly, but is also thrown when input is of the type number. | NOK❌ |
| 1.7.1 | Retest after changing the default input from string to number | Input: `'500'` for height and width each, expect error message: "Width and height must be of the type number." | Error thrown correctly | OK✅|
