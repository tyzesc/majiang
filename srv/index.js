import express from 'express';
const decide = require(__dirname + '/evaluate.js');

export default (app, http) => {
    app.use(express.json());
    app.get('/check/:hand', (req, res) => {
        let hand = req.params.hand;
        let out = decide(hand);
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ out: out });
    });
}