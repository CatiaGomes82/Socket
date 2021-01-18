var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
    console.log('yo')
    res.send({ hello: 'world' });
});

module.exports = router;