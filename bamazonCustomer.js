var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

connection.connect(function (err) {
	if (err) throw err;
	start();
});

function start() {
	inquirer
		.prompt({
			name: 'start',
			type: 'input',
			message: "Welcome to BAMAZON...Press the ENTER key to see available products..."
		})
		.then(function (){
			runDisplay();
		})
}

function runDisplay() {
	// query the database for all items available
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		console.log("\nAvailable products...\n");
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + ' || ' + results[i].product_name + ' || ' + results[i].department_name + ' || ' + results[i].price + ' || ' + results[i].stock_quantity + '\n');
		}
		userChoice(results);
	})
}

function userChoice(results) {
	inquirer
		.prompt([
			{
				name: 'choice',
				type: 'input',
				message: "Enter the item number of the product you want to buy...[Quiz with Q]"
			}
		])
		.then(function (answer) {
			if (answer.choice.toUpperCase() === "Q") {
				process.exit();
			}

			for (var i = 0; i < results.length; i++) {
				if (results[i].item_id == answer.choice) {
					var chosenItem = answer.choice;
					var id = i;

					inquirer
						.prompt({
							name: 'quantity',
							type: 'input',
							message: 'How many units of the product would you like to buy?',
							validate: function (value) {
								if (isNaN(value) === false) {
									return true;
								} else {
									return false;
								}
							}
						}).then(function (answer) {
							if ((results[id].stock_quantity - answer.quantity) > 0) {
								connection.query("UPDATE products SET stock_quantity='" + (results[id].stock_quantity - answer.quantity) + "' WHERE item_id= '" + chosenItem + "'", function (err, res2) {
									var total = answer.quantity * results[id].price;
									console.log('-------------------------------------------------------');
									console.log("Product purchased successful! Your total is: $" + parseFloat(total));
									console.log('-------------------------------------------------------');
									start();
								})
							} else {
								console.log("Insufficient quantity!")
								userChoice(results);
							}
						})
				}
			}
		})
}