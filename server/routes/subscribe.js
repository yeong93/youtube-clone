const express = require('express');
const router = express.Router();
const { subscriber } = require("../models/Subscriber");

//=================================
//             subscribe
//=================================


router.post('/subscribeNumber', (req, res) => {

    subscriber.find({'userTo': req.body.userTo})
      .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true, subscribeNumber: subscribe.length})

      })
    
})


router.post('/subscribed', (req, res) => {

    subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
      .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribe.length !== 0){
            // 구독하고 있는 상태
            result = true;
        }
        return res.status(200).json({success:true, subscribed: result})

      })
    
})

module.exports = router;
