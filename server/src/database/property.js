import { DataTypes } from 'sequelize'
import sequelize from './connection.js'
import User from './user.js'

const Property = sequelize.define(
	'Proterty',
	{
		propertyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fkUserId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'user_id',
			},
		},
		description: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		price: {
			type: DataTypes.INTEGER,
		},
		listedIn: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING,
		},
		yearlyTex: {
			type: DataTypes.DECIMAL,
		},
		address: {
			type: DataTypes.STRING,
		},
	},
	{ underscored: true }
)

User.hasMany(Property)

await Property.sync()

export default Property
