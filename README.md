# Bamazon-Inventory-Manager

## Overview

This app is an inventory management system that allows for processing of orders from customers, management of inventories by managers, and summary reports by supervisors. This app runs entirely in the terminal and runs using Node.JS as well as numerous Node Modules including Inquirer and MySqL.

### Customer View

This application runs within the terminal and is initiated by entering the command "node Bamazon-Customer.js". The user will then be provided a prompt with two messages, the first asks the user the ID of the product they would like to buy, and the second asks how many units of the product they would like to buy.  Once the user has placed the order, the application checks if the store has enough of the product to meet the customer's request and if not, the app does not allow processing of the order.  However, if the store does have enough of the product, you the customer's order is filled.


### Manager View
This application runs within the terminal and is initiated by entering the command "node Bamazon-Manager.js". The user will then be provided a prompt with the following options:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
If the user selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.
If the user selects View Low Inventory, the app lists all items with an inventory count lower than five.
If the user selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.
If a user selects Add New Product, the app allows the manager to add a completely new product to the store.

### Supervisor View
This application runs within the terminal and is initiated by entering the command "node Bamazon-Supervisor.js".  The user will then be provided a prompt with two messages, the first asks the user if they want to "View Product Sales by Department" and the second asks the user if they want to "Create New Department". If a user selects "View Product Sales by Department", the app displays a summarized table in their terminal. If the user selects "Create New Department", the app allows the user to add a Department to the datbase.

https://drive.google.com/file/d/1xMnE1DE8EusUsfVLH08IGr3qdGfT9bg_/view
