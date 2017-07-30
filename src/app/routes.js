var express = require('express');
var router = express.Router();
var static = express.static;
var path = require('path');
var multer  = require('multer')
var id = require('shortid');
var filetype = require('file-type');
var tmp = require('os').tmpdir();
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tmp+'\\uploader')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// var upload = multer({ storage: storage});
// Only hit in dev mode since Nginx handles it on live
router.use('/assets', express.static(path.join(__dirname, '..','assets')));

// router.post('/handleUpload', upload.single('image'), function(req, res, next){
// 	console.log(req.file);
// 	res.send('ok');
// })

/* Get specific image for testing without nginx*/
router.get('/i/:file', (req, res, next) => {
	if(process.env.NODE_ENV == 'development') res.sendFile(req.params.file, { root: path.join(__dirname, '../../uploads') });
	else res.sendStatus('403');
});

/* Send home page for all non-image links */
router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..','assets','index.html'));
});

router.get('/*', (req, res, next) => {
	res.redirect('/');
});

module.exports = router;
