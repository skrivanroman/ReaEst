import { DataTypes } from 'sequelize'
import sequelize from './connection.js'

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

await Property.sync()

export default Property
