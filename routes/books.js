var express = require('express');
var pool = require('../queries.js');
var router = express.Router();

router.get('/', pool.getBooks);
router.put('/edit/:id', pool.editBookById);
router.get('/:id', pool.getBookById);

module.exports = router;