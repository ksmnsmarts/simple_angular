const router = require('express').Router();

const { isAuthenticated } = require('../../../middlewares/auth');

const todo = require('./todo/todo_index');
const file = require('./file/file_index');
const auth = require('./auth/auth_index');
const user = require('./user/user_index');

/*-----------------------------------
    API
    not needed to verify
-----------------------------------*/
router.use('/file', file);
router.use('/auth', auth);


/*-----------------------------------
    Token verify
router.use(isAuthenticated) 선언 라인 이후로 토큰이 없으면 api 요청(/todo, /file)이 금지 됨.
req.decode._id를 사용하려면 decoded를 반환하는 isAuthenticated 이후 Api부터 사용 가능
-----------------------------------*/
router.use(isAuthenticated);

/*-----------------------------------
    API
    needed to verify
-----------------------------------*/
router.use('/user', user);
router.use('/todo', todo);




module.exports = router;