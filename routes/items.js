const express = require('express');
const items = require('../models/item');
const router = express.Router();


router.get("/", (req, res) => {
    console.log(req.query);
    items.find(req.query, (err, response) => {
        if (err) return res.status(404).send(err);
        res.json(response);
    });
});

router.post("/", (req, res) => {
    let item = new items({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        quality: req.body.quality,
        postingId: req.body.postingId
    });

    item.save((err, newItem) => {
        if (err) return res.status(409).send(err);
        res.send(newItem);
    });
});

module.exports = router;