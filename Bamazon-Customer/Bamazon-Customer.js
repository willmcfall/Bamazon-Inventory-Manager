// Starts database connection

var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');


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



// Display all items for sale
// Prompts user to select id of product that they would like to buy and the quantity that they would like to purchase

function afterConnection() {


    var itemChoices = []
    connection.query(
        "SELECT * FROM products", function (err, res) {
            console.log()
            for (var i = 0; i < res.length; i++) {
                itemChoices.push(res[i]);
            };
            console.table(itemChoices);
            orderRequest();
        });
};

function orderRequest() {
    inquirer
        .prompt([
            {
                name: "selection",
                type: "input",
                message: "Please select an item by providing the associated item_id:"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please select the number of items that you would like to buy:"
            }
        ])
        .then(answers => {

            connection.query(
                "SELECT stock_quantity FROM products WHERE item_id=" + answers.selection, function (err, res) {
                    if(err){
                        console.log("Please enter a valid id number!");
                        orderRequest();
                    }
                    else{

                        var integerQuantity = parseInt(res[0].stock_quantity);
                        var integerAnswer = parseInt(answers.quantity);
                        // console.log(integerQuantity);
                        // console.log(parseInt(integerAnswer));
    
                        if (integerAnswer < integerQuantity) {
                            console.log("Your order has been processed!");
                            totalCost(answers,integerAnswer);
                            updateTable(integerQuantity, integerAnswer, answers);
                        }
                        else if (integerAnswer >= integerQuantity) {
                            console.log("Inventory is insufficient to process your request! We only have " + integerQuantity + " of this item in stock. Please re-order!");
                            console.log("------------------------------------------------------------------------")
                            orderRequest();
                        };

                    }

                });
        });

};


function totalCost(answers, integerAnswer){
    connection.query(
        "SELECT price FROM products WHERE item_id=" + answers.selection, function (err, res) {
            var floatPrice = parseFloat(res[0].price);
            var totalCost = floatPrice * integerAnswer;
            totalCost = Math.floor(totalCost * 100) / 100;
            totalCost = totalCost.toFixed(2);

            console.log("The total cost of your order is $" + totalCost + ".");

            inquirer
        .prompt([
            {
                name: "reorder",
                type: "list",
                message: "What you like to place another order?",
                choices: ["Yes", "No"]
            },

        ])
        .then(answers => {
            
            if(answers.reorder == "Yes"){
            console.log("------------------------------------------------------------------");
            console.log("--------------------------NEXT ORDER------------------------------");
            console.log("------------------------------------------------------------------");
               afterConnection();
            }
            else if (answers.reorder == "No"){
                console.log("Ok. Goodnight!");
            }
        
        });


        });
};


function updateTable(integerQuantity, integerAnswer, answers){

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: (integerQuantity - integerAnswer) 
          },
          {
            item_id: answers.selection
          }
        ],
        function(err, res) {
        //   console.log("Updated successfully");
        }
      );    
};



