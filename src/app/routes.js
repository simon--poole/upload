var express = require('express');
var router = express.Router();
var static = express.static;
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: '../uploads/' })

// Only hit in dev mode since Nginx handles it on live
router.use('/assets', express.static(path.join(__dirname, '..','assets')));

/* Get specific image */
router.get('/i/:file', (req, res, next) => {
	res.sendFile(req.params.file, { root: path.join(__dirname, '../../uploads') });
});

/* Send home page for all non-image links */
router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..','assets','index.html'));
});

router.post('/uploadImage', upload.single('image'), (req, res, next) => {
	console.log(req.body);
	res.send('done');
})

router.get('/*', (req, res, next) => {
	res.redirect('/');
});

module.exports = router;
