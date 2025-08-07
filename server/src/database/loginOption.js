import { DataTypes } from 'sequelize'
import sequelize from './connection.js'

const LoginOption = sequelize.define(
	'loginOptions',
	{
		loginOptionId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{ underscored: true }
)

await LoginOption.sync({ alter: false })

export default LoginOption
