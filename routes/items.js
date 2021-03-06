const express = require('express');
const items = require('../models/item');
const router = express.Router();

/**
 * Hadles querries on the items recieved from individual postings.
 */
router.get("/", (req, res) => {
    console.log(req.query);
    items.find(req.query, (err, response) => {
        if (err) return res.status(404).send(err);
        res.json(response);
    });
});
/**
 * Adds new items that are received from individual postings
 */
router.post("/", (req, res) => {
    console.log(req);
    let item = new items({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        quality: -1,
        postingId: req.body.postingId
    });

    item.save((err, newItem) => {
        if (err) return res.status(409).send(err);
        res.send(newItem);
    });
});
/**
 * Modifies the items on the request of other modules.
 */
router.put("/", (req, res) => {
    console.log(req);
    items.findOneAndUpdate({postingId : req.body.postingId},{quality: req.body.quality, quantity: req.body.quantity}, {new: true} ,(err, response) => {
        if (err) return res.status(400).send(err);
        ///use response to update inven
    });
});

module.exports = router;