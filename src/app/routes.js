var express = require('express');
var router = express.Router();

/* Send home page for all non-image links */
router.get('/*', function(req, res, next) {
	res.sendFile('../assets/index.html');
});

module.exports = router;
