const router = require('express').Router();
const {User} = require('./db');
module.exports = router;

router.put('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: req.body
		});
		if (user) {
			req.session.userId = user.id;
			res.status(200).json(user);
		} else {
			const err = new Error('Incorrect email or password!');
			err.status = 401;
			next(err);
		}
	}
	catch (err) {
		next(err);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(204).json(user);
	}
	catch (err) {
		next(err);
	}
});