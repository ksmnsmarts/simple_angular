const jwt = require('jsonwebtoken');

/*-------------------------------------------------
	Sign Up
-------------------------------------------------*/
exports.signUp = async (req, res) => {
	console.log(`
--------------------------------------------------  
  API  : Signup
  router.post('signUp', authController.signUp) 
--------------------------------------------------`);
	const dbModels = global.DB_MODELS;

    console.log(req.body)

    const criteria = {
        id: req.body.id
    };
    const projection = '_id';

    const userData = {
        id: req.body.id,
        password: req.body.password,
        name: req.body.name,
    }

    try {
        const user = await dbModels.User.findOne(criteria, projection);

        if (user) {
            return res.status(200).send({
                message: 'duplicated'
            })
        }

        const newUser = dbModels.User(userData);

        await newUser.save();

        res.status(201).send({
            message: 'created'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }

};

/*-------------------------------------------------
	Sign In
-------------------------------------------------*/
exports.signIn = async (req, res) => {
	console.log(`
--------------------------------------------------  
  API  : SignIn
  router.post('signIn', authController.signIn) 
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

	// console.log(req.body);

	try {

		const criteria = {
			id: req.body.id
		}

		const user = await dbModels.User.findOne(criteria);

		if(!user) {
			// console.log('No Matched Account');
			return res.status(404).send({
				message: 'not found'
			});
		}

		const isMatched = await user.comparePassword(req.body.password, user.password);

		if(!isMatched) {
			return res.status(200).send({ 
				message: 'mismatch'
			});
		}

		const payload = {
			_id: user._id,
			name: user.name,
		};

		const jwtOption = {
			expiresIn: '1d'
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOption);

		/*------------------------------------------
			5. send token and profile info to client
		--------------------------------------------*/
		res.send({
			token
		});


	} catch (error) {
		console.log(error);
		return res.status(500).send('An error has occurred in the server');
	}
};
