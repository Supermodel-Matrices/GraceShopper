const crypto = require('crypto');
const _ = require('lodash');

const db = require('./db');
const Sequelize = require('sequelize');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
				notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
				isEmail: true,
				notEmpty: true
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	googleId: {
    type: Sequelize.STRING
  },
	salt: {
    type: Sequelize.STRING
	},
	cart: {
		type: Sequelize.JSON,
		defaultValue: {},
	}
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

User.prototype.addToCart = async function (id) {
	const [updatedRow, updatedUser] = await User.update({cart: {...this.cart, [id]: this.cart[id] ? this.cart[id] + 1 : 1}}, {where: {id: this.id}, returning: true});
	return updatedUser[0].cart;
};
User.prototype.removeFromCart = async function (id) {
	if (this.cart[id] === 1) {
		const {[id]: ignore, ...newCart} = this.cart;
		const [updatedRow, updatedUser] = await User.update({cart: newCart}, {where: {id: this.id}, returning: true});
		return updatedUser[0].cart
	} else {
		const [updatedRow, updatedUser] = await User.update({cart: {...this.cart, [id]: this.cart[id] - 1}}, {where: {id: this.id}, returning: true});
	  return updatedUser[0].cart;
	}
};

User.prototype.correctPassword = function (candidatePassword) {
  return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User;
