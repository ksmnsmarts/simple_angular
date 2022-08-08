const jwt = require('jsonwebtoken');
// config에 따라 다르게..

/*-----------------------------------------
*  JWT 토큰 생성 - /signIn Api에서 토큰 생성하기에 이건 쓰지 않고 있음
-----------------------------------------*/
exports.createToken = payload => {
	const jwtOption = {
		expiresIn: '1d'
	};
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token) => {
			if (error) reject(error);
			resolve(token);
		});
	});
};


/*-----------------------------------------
*  JWT 토큰 검증 - api 요청 전 token 확인
-----------------------------------------*/
exports.verifyToken = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			if (error) reject(error);
			resolve(decoded);
		});
	});
};
