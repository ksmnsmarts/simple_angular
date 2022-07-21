const router = require('express').Router();
const fileController = require('./file_controller');

const multer = require('multer');

/* Setup File upload */
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'imgs/'); // 저장할 파일의 위치 설정-- imgs
        },
        filename(req, file, cb) {
            cb(null, file.originalname); // 전송된 파일의 이름으로 파일을 저장한다.
        }
    })
});

/* file  */
router.get('/getFileList', fileController.getFileList);
router.post('/upload', upload.any(), fileController.upload);
router.get('/download', fileController.download);


module.exports = router;