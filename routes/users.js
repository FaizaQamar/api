var express = require('express');
var router = express.Router();
var pool = require('../queries');
/* GET users listing. */


router.get('/', pool.getUsers);
router.put('/edit/:id', pool.editUserById);
router.get('/:id', pool.getUserById);


module.exports = router;
