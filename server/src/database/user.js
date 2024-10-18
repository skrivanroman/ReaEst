import { DataTypes } from 'sequelize'
import sequelize from './connection.js'
import argon2 from 'argon2'
import LoginOption from './loginOption.js'

const User = sequelize.define(
	'User',
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
			isEmail: true,
		},
		fkLoginOptionId: {
			type: DataTypes.INTEGER,
			references: {
				model: LoginOption,
				key: 'login_option_id',
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		companyName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		position: {
			type: DataTypes.STRING,
		},
		profilePicturePath: {
			type: DataTypes.STRING,
			defaultValue: './defaultPath',
		},
		facebookUrl: {
			type: DataTypes.STRING,
		},
		instagramUrl: {
			type: DataTypes.STRING,
		},
		twitterUrl: {
			type: DataTypes.STRING,
		},
		LinkedinUrl: {
			type: DataTypes.STRING,
		},
		websiteUrl: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING(20),
		},
		aboutMe: {
			type: DataTypes.STRING(1024),
		},
		country: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		postalCode: {
			type: DataTypes.STRING,
		},
		Street: {
			type: DataTypes.STRING,
		},
		houseNumber: {
			type: DataTypes.STRING,
		},
	},
	{ underscored: true }
)

LoginOption.hasMany(User, {
	foreignKey: 'fk_login_option_id',
})

await User.sync({ force: false })

User.register = async (email, password, loginOption, firstName, lastName) => {
	try {
		const sameEmail = await User.findAll({
			attributes: ['userId'],
			where: {
				email,
			},
		})

		if (sameEmail.length > 0) {
			return false
		}

		const { loginOptionId } = await LoginOption.findOne({
			where: {
				name: loginOption,
			},
		})

		if (loginOption === 'password') {
			const hash = await argon2.hash(password)
			await User.create({ email, password: hash, firstName, lastName, fkLoginOptionId: loginOptionId })
		} else if (loginOption === 'google') {
			await User.create({ email, firstName, lastName, fkLoginOptionId: loginOptionId })
		}

		return true
	} catch (err) {
		console.log('Failed to register a new user!', err)
		return false
	}
}

User.login = async (email, password) => {
	try {
		const currUser = await User.findOne({
			attributes: ['password'],
			where: {
				email,
			},
		})
		return await argon2.verify(currUser.password, password)
	} catch (err) {
		console.log('Failed to login user!')
		return false
	}
}

export default User
