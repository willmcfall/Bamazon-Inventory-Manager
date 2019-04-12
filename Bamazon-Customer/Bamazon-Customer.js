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
    console.log("connected as id " + connection.threadId);
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
                message: "Please select product you would like to buy, by providing the associated item_id:"
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
                    var integerQuantity = parseInt(res[0].stock_quantity);
                    var integerAnswer = parseInt(answers.quantity);
                    console.log(integerQuantity);
                    console.log(parseInt(integerAnswer));
                    if (integerAnswer < integerQuantity) {
                        console.log("Your order is confirmed!");
                        totalCost(answers,integerAnswer);
                    }
                    else if (integerAnswer >= integerQuantity) {
                        console.log("Inventory is insufficient to process your request! We only have " + integerQuantity + " of this item in stock. Please re-order!");
                        console.log("---------------------------------------------------------------------------------------")
                        orderRequest();
                    };

                });
        });

};


function totalCost(answers, integerAnswer){
    connection.query(
        "SELECT price FROM products WHERE item_id=" + answers.selection, function (err, res) {
            var floatPrice = parseFloat(res[0].price);
            console.log("The total cost of your order is $" + (floatPrice * integerAnswer) + ".");

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
            console.log("---------------------------------------------------------------------------------------");
               afterConnection();
            }
            else if (answers.reorder == "No"){
                console.log("Ok. Goodnight!");
            }
        
        });


        });
};



// Check whether the quantity requested can be accommodated by the inventory;

// IF YES
// process the request
// update the database
// provide the user with the total bill of their purchase


// IF NO
// alert user
// prevent processing of request
// do not update database




// creates empty database structure (id, item name, item category, ask price, bid price)






// function afterConnection() {

//    inquirer
//        .prompt([
//            {
//                name: "action",
//                type: "input",
//                message: "Would you like to [Post] or [Bid] on an auction?"
//            }
//        ])
//        .then(answers => {

//            if (answers.action == "post") {
//                ask();
//            }
//            else if (answers.action == "bid") {
//                bid();
//            }

//        });

// };



// function ask() {
//    console.log("ask function worked");

//    inquirer
//        .prompt([
//            {
//                name: "item",
//                type: "input",
//                message: "Enter name of item to be auctioned:"
//            },
//            {
//                name: "itemcategory",
//                type: "list",
//                message: "Select item category",
//                choices: ["Electronics", "Apparel", "Other"]
//            },
//            {
//                name: "askprice",
//                type: "input",
//                message: "Enter ask price for item:"
//            },
//        ])
//        .then(answers => {
//            var query = connection.query(
//                "INSERT INTO greatbay SET ?",
//                {
//                    item: answers.item,
//                    itemcategory: answers.itemcategory,
//                    askprice: answers.askprice
//                },
//                function (err, res) {
//                    console.log(res.affectedRows + " product inserted!\n");
//                }
//            );

//        });
// };



// function bid() {
//    console.log("bid function worked");

//    var itemChoices = []
//    connection.query(
//        "SELECT item FROM greatbay", function (err, res) {
//            console.log(res.affectedRows + " product inserted!\n");
//            //console.log(res)
//            for (var i = 0; i < res.length; i++) {
//                itemChoices.push(res[i].item)
//            }
//            withinAsk()
//        })
//    console.log(itemChoices)

//    function withinAsk() {

//        inquirer.prompt([
//            {
//                name: 'item',
//                type: 'list',
//                message: 'Select item for bidding',
//                choices: itemChoices
//            },
//            {
//                name: 'bidprice',
//                type: 'input',
//                message: 'Enter price you would like to bid on this item'
//            }
//        ]).then(answers => {
//            function updateProduct() {
//                console.log('updating')

//                var query = connection.query('UPDATE greatbay SET ? WHERE ?', [
//                    {
//                        bidprice: answers.bidprice
//                    },
//                    {
//                        item: answers.item
//                    }
//                ], function (err, res) {
//                    console.log(res);
//                    checkProduct();

//                })
//            }
//            updateProduct()
//        })



//    }

