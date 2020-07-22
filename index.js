const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;


const itemRoutes = require('./routes/items');
const inventoryRoutes = require('./routes/inventory');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });


app.use("/api/items", itemRoutes);
app.use("/api/inventory", inventoryRoutes);
mongoose.connect('mongodb://localhost/ead_inventory');

app.get('/', (req, res) => {
    res.send("nothing here");
}); 


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connection successful")
  app.listen(port, () => console.log(`App listening on port ${port}!`))

});

module.exports = app