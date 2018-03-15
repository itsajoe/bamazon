var mysql = require("mysql");
var Inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
  });

// query all from db
function findAll (cb) {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log("Id: " +res[i].item_id + " | Name: " + res[i].product_name + " | Price: " + res[i].price);
    }
    // console.log(res);
    // connection.end();
    cb();
  });
}
function update (id, amount) {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: amount
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      // console.log(res);
      // console.log(res.affectedRows + " products updated!\n");
      
    }
  );
}

function findOne (id, amount, cb) {
  var query = connection.query("SELECT * FROM products WHERE ?", {item_id: id},  function(err, res) {
    // console.log(res);  
    if (res[0].stock_quantity < amount) {
        console.log("We do not have enough of that product in stock.");
        cb();
      } else {
        var updated = res[0].stock_quantity -= amount;
        var price = res[0].price * amount;
        // console.log(updated);
        console.log("Your total price is $" + price);
        update(id, updated);
        cb();
      }
  })
}
// findAll();
// display results with Inquirer id name price
// ask which to buy
// update bought product
function run() {
  findAll(function() {
    Inquirer.prompt([
      {
        name: "id",
        message: "Which product would you like to purchase?"
    },
      {
        name: "amount",
        message: "How many would you like to purchase?"
    }
    ]).then(function(answer) {
      var id = answer.id;
      var amount = answer.amount;
      // console.log(id);
      // console.log(amount);
      findOne(id, amount, function() {
        Inquirer.prompt([
        {
          name: "if",
          message: "Would you like to continue shopping? Yes or No"
      },
      ]).then(function(answer) {
        if (answer.if == "Yes") {
          run()
        } else {
          connection.end();
        }
      })
      });
      
    })
  });


    
}

run();

