
// prompt the user to select either View Product Sales by Department or Create New Department


// When a supervisor selects View Product Sales by Department, the app should display a summarized table 
// in their terminal/bash window. Use the table below as a guide.

// department_id
// department_name
// over_head_costs
// product_sales
// total_profit


// 01
// Electronics
// 10000
// 20000
// 10000


// 02
// Clothing
// 60000
// 100000
// 40000



// The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.


// Hint: You may need to look into aliases in MySQL.
// Hint: You may need to look into GROUP BYs.
// Hint: You may need to look into JOINS.
// HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)


// Starts database connection

var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    afterConnection();
});


// Prompt user to select from menu
function afterConnection() {
    inquirer
        .prompt([
            {
                name: "selection",
                type: "list",
                message: "Please select a task:",
                choices: ["View Product Sales By Department", "Create New Department"]
            },
        ])
        .then(answers => {
            console.log(answers.selection);
            switch (answers.selection) {
                case "View Product Sales By Department":
                    productSales();
                    break;
                case "Create New Department":
                    createDepartment();
                    break;
            };
        });
};


function productSales(){
    
    connection.query("SELECT departments.department_name AS Department, SUM(product_sales) AS Total_Sales, departments.over_head_costs AS Total_Costs, sum(product_sales) - departments.over_head_costs AS Total_Profit FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_name", function (err, result) {
        if (err) throw err;
        console.table(result);
        console.log("--------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------");
        anotherTask();
    });
};


function createDepartment() {

    connection.query("SELECT * FROM departments", function (err, result) {
        if (err) throw err;
        console.table(result);

        inquirer
            .prompt([
                {
                    name: "added_department",
                    type: "input",
                    message: "Please enter the name of department you would like to add:",
                },
                {
                    name: "added_over_head_costs",
                    type: "input",
                    message: "Please enter the overhead cost of the department you would like to add:",
                }
            ])
            .then(answers => {
                connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",
                    [answers.added_department, parseInt(answers.added_over_head_costs)]
                    , function (err, result) {
                        console.log("Successfully added department, " + answers.added_department + ", to the database.");
                        console.log("--------------------------------------------------------------------");
                        console.log("--------------------------------------------------------------------");
                        anotherTask();
                    });
            });
    });
};


function anotherTask() {
    // console.log("successfully ran another task function");
    inquirer
        .prompt([
            {
                name: "another",
                type: "list",
                message: "Would you like to run another task:",
                choices: ["Yes", "No"]
            },
        ])
        .then(answers => {
            console.log(answers.another);
            if (answers.another == "Yes") {
                afterConnection();
            }
            else if (answers.another == "No") {
                console.log("Ok. Goodbye!");
            }
        });

};
