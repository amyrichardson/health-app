const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.put('/adjust', (req, res) => {
    console.log('in server with new start weight', req.body.weightType);
    if(req.body.weightType === 'start_weight') {
        const query = ('UPDATE users SET start_weight = $1 WHERE id = $2');
        pool.query(query, [req.body.newWeight, req.user.id])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(500);
            })
    } else if(req.body.weightType === 'goal_weight') {
        const query = ('UPDATE users SET goal_weight = $1 WHERE id = $2');
        pool.query(query, [req.body.newWeight, req.user.id])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log(error);
            })
    }
})


module.exports = router;