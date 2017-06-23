var express = require('express');
var router = express.Router();

/* Send home page for all non-image links */
router.get('/*', function(req, res, next) {
	res.send('Nothing here yet - coming soon!');
});

module.exports = router;
