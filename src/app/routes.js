var express = require('express');
var router = express.Router();
var static = express.static;
var path = require('path');
var multer  = require('multer')
var id = require('shortid');
var filetype = require('file-type');
var tmp = require('os').tmpdir();


// Only hit in dev mode since Nginx handles it on live
router.use('/assets', express.static(path.join(__dirname, '..','assets')));

// No files yet please
// router.post('/handleUpload', upload.single('image'), function(req, res, next){
// 	console.log(req.file);
// 	res.send('ok');
// });

/* Get specific image for testing without nginx*/
router.get('/i/:file', (req, res, next) => {
	res.sendFile(req.params.file, { root: path.join(__dirname, '../../uploads') });
});

/* Send home page for all non-image links */
router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..','assets','index.html'));
});

router.get('/*', (req, res, next) => {
	res.redirect('/');
});

module.exports = router;
