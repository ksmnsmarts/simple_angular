const { ObjectId } = require('bson');
var fs = require("fs");
const mongoose = require('mongoose');


// get all To do list
exports.getAllTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.get('/getAllTodo', todoController.getAllTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    try {
        const findTodo = await dbModels.Todo.find();

        if (!findTodo) {
            return res.status(401).send({
                message: 'An error has occurred'
            });
        }

        return res.send(
            findTodo
        );

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}

// To do my list 가져오기
exports.getMyTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.get('/getMyTodo', todoController.getMyTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    try {
        const findMyTodo = await dbModels.User.aggregate([
            {
                /*---------------------------------------------
                *           $match
                *   지정된 조건과 일치하는 문서만 다음 파이프라인 단계로 전달하도록 문서를 필터링.
                ---------------------------------------------*/
                $match: {
                    _id: ObjectId(req.decoded._id)
                }
            },
            {
                /*---------------------------------------------
                *           $lookup
                *   SQL의 join 처럼 타 컬렉션과 결합하여 하나의 결과를 도출.
                *   $lookup 시 $match 하여 나온 값에 filed 가 추가되어 하나의 결과로 나옴.
                ---------------------------------------------*/
                $lookup: {
                    from: 'todos',              // 참조할 collection
                    localField: '_id',          // $match되어 나온 결과 중 비교할 filed
                    foreignField: 'userId',     // 참조할 collection의 filed 
                    as: 'myTodo'                // $match되어 나온 결과에 추가될 filed의 이름 지정
                }
            },
            {
                /*---------------------------------------------
                *           $unwind
                *   'myTodo' filed는 type이 배열이며 배열을 풀어서 출력할 때 사용.
                *   ex) 'myTodo' filed의 length가 3이면 배열의 갯수만큼 3개의 document로 분리한다.
                ---------------------------------------------*/
                $unwind: {
                    path: '$myTodo',                    // 분리 할 filed 명
                    preserveNullAndEmptyArrays: true    // $myTodo의 원소가 없거나 null이어도 출력
                }
            },
            {
                /*---------------------------------------------
                *           $project
                *   어떤 filed를 출력에 포함할지 제외할지 지정할 때 사용.
                *   포함할 filed에 대해서는 1 혹은 true 값을, 제외할 필드에 대해서는 0 혹은 false 값을 지정.
                ---------------------------------------------*/
                $project: {
                    '_id': '$myTodo._id',
                    'id': 1,
                    'name': 1,
                    'todo': '$myTodo.todo'
                }
            },
            {
                /*---------------------------------------------
                *           $sort
                *   오름차순
                ---------------------------------------------*/
                $sort: {
                    'todo': 1   // 비교할 대상 filed
                }
            }
        ]);

        return res.send(
            findMyTodo
        );

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// To do 생성
exports.addTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.post('/addTodo', todoController.addTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;
    const data = req.body;

    const criteria = {
        _id: req.decoded._id
    };

    const projection = {
        id: 1,
        name: 1,
    }

    const findUser = await dbModels.User.findOne(criteria, projection);

    if (!findUser) {
        return res.status(401).send({
            message: 'An error has occurred'
        });
    }

    const todoData = {
        userId: req.decoded._id,
        name: findUser.name,
        todo: data.todo,
    }


    try {
        const newTodo = await dbModels.Todo(todoData)
        await newTodo.save();

        return res.send({
            message: 'success todo save'
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// To do 수정
exports.editTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.post('/editTodo', todoController.editTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.body;
    // console.log(data)

    try {
        const findTodo = await dbModels.Todo.findOneAndUpdate(
            {
                _id: data._id
            },
            {
                todo: data.todo
            }
        )

        return res.send({
            message: 'success todo edit'
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}



// To do 삭제
exports.deleteTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.post('/deleteTodo', todoController.deleteTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.body;
    // console.log(data)

    try {
        const findTodo = await dbModels.Todo.findOneAndDelete(
            {
                _id: data._id
            }
        )

        return res.send({
            message: 'success todo delete'
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}