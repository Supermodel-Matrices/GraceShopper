const router = require('express').Router();
const {User} = require('./db');
module.exports = router;

router.put('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {email: req.body.email}
		});
		if (!user) {
			res.status(401).send('User not found');
		}
    else if (!user.correctPassword(req.body.password)) {
			res.status(401).send('Incorrect password');
		}
		else {
			req.login(user, err => {
				if (err) next(err);
				else res.json(user);
			});
		}
	}
	catch (err) {
		next(err);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(409).send('email already registered');
		}
		else {
			const newUser = await User.create(req.body);
			req.login(newUser, err => {
				if (err) {
					next(err);
				}
				else {
					res.json(newUser);
				}
			});
		}
	}
	catch (err) {
		next(err);
	}
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

// router.get('/me', async (req, res, next) => {
// 	try {
// 		if (!req.session.userId) {
// 			const err = new Error('No logged in user');
// 			err.status = 404;
// 			next(err);
// 		} else {
// 			const user = await User.findById(req.session.userId);
//         if (user) {
// 					res.json(user);
// 				} else {
//           const err = new Error('User not found');
// 					err.status = 404;
// 					next(err);
// 				}
// 		}
// 	}
// 	catch (err) {
// 		next(err);
// 	}
// });

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', require('./oauth'));

