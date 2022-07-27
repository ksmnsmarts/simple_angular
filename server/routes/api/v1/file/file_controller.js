const { ObjectId } = require('bson');
var fs = require("fs");
const mongoose = require('mongoose');

// 파일 목록 가져오기
exports.getFileList = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.get('/getFileList', todoController.getFileList);
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    try {
        const fileList = 'imgs/';

        // imgs/ 폴더 내의 모든 파일의 이름을 가져온다
        fs.readdir(fileList, (err, files) => {
            return res.send({
				files
			});
          });
        

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// 파일 업로드
exports.upload = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.post('/upload', todoController.upload);
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    const data = req.files[0]

    console.log(data)

    try {
        const findFile = 'imgs/' + data.originalname;

        if(findFile) {
            return res.send({
				message: 'success save'
			});
        }
        

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// 파일 다운로드
exports.download = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.post('/download', todoController.download);
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    const data = req.query;

    try {
        const file = 'imgs/' + data.name

        return res.download(file);
        

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}



