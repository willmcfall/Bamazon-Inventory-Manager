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
                choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "New Product"]
            },
        ])
        .then(answers => {
            console.log(answers.selection);
            switch (answers.selection) {
                case "Products for Sale":
                    productSales();
                    break;
                case "Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "New Product":
                    addProduct();
                    break;
            };
        });
};



// Based on selected item run Products for Sale
// The function (Read) should list every available item: the item IDs, names, prices, and quantities.
function productSales() {
    // console.log("successfully ran product sales function");

    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);
        console.log("--------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------");
        anotherTask();
    });

};


// Based on selected item run Low Inventory
// The function (Read) should list all items with an inventory count lower than five.
function lowInventory() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, result) {
        if (err) throw err;
        if (result == "") {
            console.table("All inventories are sufficient!");
            console.log("--------------------------------------------------------------------");
            console.log("--------------------------------------------------------------------");
            anotherTask();
        } else if (result !== "") {
            console.table(result);
            console.log("--------------------------------------------------------------------");
            console.log("--------------------------------------------------------------------");
            anotherTask();
        };

    });


};


// Based on selected item run Add to Inventory
// The function (Update) should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    console.log("successfully ran add inventory function");

    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);

        inquirer
            .prompt([
                {
                    name: "updated_item",
                    type: "input",
                    message: "Please enter the id of the item that you would like to update:",
                },
                {
                    name: "updated_quantity",
                    type: "input",
                    message: "Please enter the quantity of the item that you would like to add:",
                },
            ])
            .then(answers => {
                // console.log(answers.updated_item);
                // console.log(answers.updated_quantity);
                connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
                    [parseInt(answers.updated_quantity), answers.updated_item]
                    , function (err, result) {
                        console.log("Successfully updated inventory with the addition of " + answers.updated_quantity + " units.");
                        console.log("--------------------------------------------------------------------");
                        console.log("--------------------------------------------------------------------");
                        anotherTask();
                    });
            });
    });
};


// Based on selected item run New Product
// The function (Insert) should allow the manager to add a completely new product to the store.
function addProduct() {
    console.log("successfully ran add product function");

    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);

        inquirer
            .prompt([
                {
                    name: "added_product",
                    type: "input",
                    message: "Please enter the kind of product would you like to add:",
                },
                {
                    name: "added_category",
                    type: "input",
                    message: "Please enter the category of the added product:",
                },
                {
                    name: "added_price",
                    type: "input",
                    message: "Please enter the price of the added product:",
                },
                {
                    name: "added_quantity",
                    type: "input",
                    message: "Please enter the quantity of the product that you would like to add:",
                },
            ])
            .then(answers => {
                connection.query("",
                    [parseInt(answers.updated_quantity), answers.updated_item]
                    , function (err, result) {
                        console.log("Successfully added product, " + answers.added_product + ", to the database.");
                        console.log("--------------------------------------------------------------------");
                        console.log("--------------------------------------------------------------------");
                        anotherTask();
                    });
            });

        anotherTask();
    });

};

// Prompt the user to add a selection
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
