const express = require('express');
const items = require('../models/inven');
const router = express.Router();


router.get("/", (req, res) => {
    console.log(req.query);
    items.find(req.query, (err, response) => {
        if (err) return res.status(404).send(err);
        res.json(response);
    });
});


router.post("/", (req, res) => {
    itemName = req.body.name;
    items.findOne({name:itemName}, (err, response) => {
        if (err) return res.status(400).send(err);
        if (response == null){
            let item = new items({
                name: req.body.name,
                category: req.body.category,
                quantity: req.body.quantity,
                quality: req.body.quality,
                price: req.body.price
            });
            item.save((err, newItem) => {
                if (err) return res.status(400).send(err);
                res.status(200).send(item);
            });
        }
        else{
            let newQty = response.quantity + req.body.quantity;
            let newQul = (response.quality * response .quantity + req.body.quality * req.body.quantity) / (response.quantity + req.body.quantity);
            let newPrice = (response.price * response.quantity + req.body.price * req.body.quantity) / (response.quantity + req.body.quantity);
            response.quantity = newQty;
            response.quality = newQul;
            response.price = newPrice;
            response.save();
            res.status(200).send(req.body);
        }
    });
});

router.post("/remove", (req, res) => {
    console.log(req.body);
    itemName = req.body.name;
    items.findOne({name: itemName}, (err, response) => {
        if (err) return res.status(400).send(err);
        console.log(response);
        if (response == null){
            cost = 50.87 * req.body.quantity;
            res.status(200).send({price: cost});
        }
        else if (response.quantity < req.body.quantity){
            cost = req.body.quantity * response.price;
            response.quantity = 0;
            response.save();
            res.status(200).send({price: cost});
        }
        else{
            cost = req.body.quantity * response.price;
            response.quantity -= req.body.quantity;
            response.save();
            res.status(200).send({price: cost});
        }
    });
});

module.exports = router;