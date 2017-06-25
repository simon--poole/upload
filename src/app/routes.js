var express = require('express');
var router = express.Router();
var static = express.static;
var path = require('path');

router.use('/assets', express.static(path.join(__dirname, '..','assets')));

/* Get specific image */
router.get('/i/:file', function(req, res, next) {
	res.sendFile(req.params.file, { root: path.join(__dirname, '../../uploads') });
});

/* Send home page for all non-image links */
router.get('/*', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','assets','index.html'));
});

module.exports = router;
