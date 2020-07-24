const express = require('express');
const items = require('../models/inven');
const router = express.Router();



router.post("/", (req, res) => {
    console.log(req.body);
    
    itemName = req.body.name;
    try {
        console.log(req.files);
        itemPhoto = req.files.image;    
    } catch (error) {
        console.log("error in file");
    }
    
    let qual = Math.random() * 15 + 84;
    qual = Math.round(qual * 100) / 100;
    console.log(qual);
    items.findOne({name:itemName}, (err, response) => {
        if (err) return res.status(400).send(err);
        if (response == null){
            let item = new items({
                name: req.body.name,
                category: req.body.category,
                quantity: Number(req.body.quantity),
                quality: qual,
                price: Math.round(100 * Number(req.body.price) * qual / 100) / 100,
            });
            item.save((err, newItem) => {
                if (err) return res.status(400).send(err);
                res.status(200).send({price: response.price * response.quantity});
            });
        }
        else{
            let newQty = Number(response.quantity) + Number(req.body.quantity);
            let newQul = (response.quality * response .quantity + qual * Number(req.body.quantity) / 100) / newQty;
            let newPrice = (response.price * response.quantity + qual * Number(req.body.price) * Number(req.body.quantity) / 100 ) / newQty;
            response.quantity = Math.round(newQty * 100) / 100;
            response.quality = Math.round(newQul * 100) / 100;
            response.price = Math.round(newPrice * 100) / 100;
            response.save();
            res.status(200).send({price: response.price * Number(req.body.quantity)});
        }
    });
});

module.exports = router;