var express = require('express');
var router = express.Router();
const indexController =  require('../controllers/indexcontroller')

router.get('/', indexController.index)
router.get("/searchResults", indexController.search)

module.exports = router