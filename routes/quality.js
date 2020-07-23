const express = require('express');
const items = require('../models/inven');
const router = express.Router();



router.post("/", (req, res) => {
    console.log("hi");
    console.log(req.files);
    itemName = req.body.name;
    itemPhoto = req.files.image;
    let qual = Math.random() * 15 + 84;
    console.log(qual);
    items.findOne({name:itemName}, (err, response) => {
        if (err) return res.status(400).send(err);
        if (response == null){
            let item = new items({
                name: req.body.name,
                category: req.body.category,
                quantity: req.body.quantity,
                quality: qual,
                price: req.body.price * qual,
            });
            item.save((err, newItem) => {
                if (err) return res.status(400).send(err);
                res.status(200).send(item);
            });
        }
        else{
            let newQty = response.quantity + req.body.quantity;
            let newQul = (response.quality * response .quantity + qual * req.body.quantity) / (response.quantity + req.body.quantity);
            let newPrice = (response.price * response.quantity + qual *req.body.price * req.body.quantity) / (response.quantity + req.body.quantity);
            response.quantity = newQty;
            response.quality = newQul;
            response.price = newPrice;
            response.save();
            res.status(200).send(req.body);
        }
    });
});

module.exports = router;