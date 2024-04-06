const express = require('express');
const router = express.Router();

router.get('/session', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`Vous avez visité cette page ${req.session.views} fois.`);
    } else {
        req.session.views = 1;
        res.send('Bienvenue sur cette page pour la première fois !');
    }
});

module.exports = router;