# ExpenseTracker
A MEAN app for expense log and time-based expense tracking service.

## Description
This Expense Tracker Web APP is designed by Yutong Huang (YutongHuangCMU). The framework used is MEAN Stack (MongoDB, Express, AngularJS, NodeJS), follow the MVC pattern. The UI design is based on Materialize.

## Basic Functionalites
### RESTful API endpoint 
The design of the backend service follows the RESTful principle. 
Some of the sample apis are: 
1. ```/api/v1/signup``` used to signup the user.
2. ```/api/v1/login``` used to login the user.
3. ```/api/v1/report/:username/:info``` used to get the logs information based on certain criteria.

### User Management
To implement the user management both for regular user and admin, the following mechanism is implemented.
1. When sign up, an admin user must provide the access code.
2. All admin and regular users cannot share same username.
3. Users are stored in the same collection, with the "type" field indicates the type.

## Additional Functionalities
1. Different expense tracking criteria is supported. User can track expense based on hour, day, week, month and year.
2. The tracking record is stated using line chart powered by angular-chart.js.

## Bugs 
The application is not fully developed, some functionalities might still have small problems and bugs.
1. When add expenses, the input value is not strictly checked.
2. The table in the front page is not auto updated sometime due to the asynchronize call when add, update and delete expense.

## Installation
1. Please clone the code locally.
2. Please download and install Node.js following the official guidance at https://nodejs.org/en/.
3. Please do ```npm install``` on command line in the repository that you clone the code to.
4. Please substitute the "DATABASE INFO" in server.js file using the database information.
5. Please do command line ```redis-server``` to set up the redis server. If redis is not already installed, please follow the instruction at https://redis.io/
5. Please use ```ACCESSCODE="XXX" node server.js``` on command line to run server. The port is on 3000.

## Test
To test the application, here are some tips and suggestions:
1. the app will be launched at localhost:3000
2. default page is welcome page. Once logged in, the content will change to a form used to log expense, and a table shows the current logs.
3. the table will give the options of update and delete for each record.
4. there is a report button direct user to the report page to see report.
5. report page contains a form used to trigger the expense during certain time range, and a chart shows the expenses on timeline.
6. If the logged in user is an admin, there will be one more button says "all logs", used to get all expenses group by users.
Some sample data is ready in the database.
