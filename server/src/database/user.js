import { DataTypes } from 'sequelize'
import sequelize from './connection.js'
import argon2 from 'argon2'

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
		profilePicturePath: {
			type: DataTypes.STRING,
			defaultValue: './defaultPath',
		},
	},
	{ underscored: true }
)

await User.sync({ force: false })

User.register = async (email, password, firstName, lastName) => {
	try {
		const hash = await argon2.hash(password)
		await User.create({ email, password: hash, firstName, lastName })
	} catch (err) {
		console.log('Failed to register a new user!', err)
	}
}

User.login = async ({ email, password }) => {
	try {
		const [currUser] = await User.findAll({
			attributes: ['password'],
			where: {
				email,
			},
		})
		return await argon2.verify(currUser.password, password)
	} catch (err) {
		console.log('Failed to login user!')
	}
}
export default User
