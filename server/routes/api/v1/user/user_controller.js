// user profile 가져오기
exports.getUserProfile = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.get('/getUserProfile', userController.getUserProfile);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const criteria = {
        _id: req.decoded._id
    }

    try {
        const findUser = await dbModels.User.findOne();

        if (!findUser) {
            return res.status(401).send({
                message: 'An error has occurred'
            });
        }

        return res.send(
            findUser
        );

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}
