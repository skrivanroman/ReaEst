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
		uuid: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
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
		payType: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING,
		},
		yearlyTax: {
			type: DataTypes.DECIMAL,
		},
		afterPrice: {
			type: DataTypes.STRING,
		},
		imagesCount: {
			type: DataTypes.INTEGER,
		},
		street: {
			type: DataTypes.STRING,
		},
		country: {
			type: DataTypes.STRING,
		},
		region: {
			type: DataTypes.STRING,
		},
		zipCode: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		cityPart: {
			type: DataTypes.STRING,
		},
		customId: {
			type: DataTypes.STRING,
		},
		size: {
			type: DataTypes.INTEGER,
		},
		roomCount: {
			type: DataTypes.INTEGER,
		},
		bedroomCount: {
			type: DataTypes.INTEGER,
		},
		bathroomCount: {
			type: DataTypes.INTEGER,
		},
		garageCount: {
			type: DataTypes.INTEGER,
		},
		yearBuilt: {
			type: DataTypes.DATEONLY,
		},
		availableFrom: {
			type: DataTypes.DATEONLY,
		},
		status: {
			type: DataTypes.STRING,
		},
		lat: {
			type: DataTypes.STRING,
		},
		lng: {
			type: DataTypes.STRING,
		},
	},
	{ underscored: true }
)

User.hasMany(Property, {
	foreignKey: 'fk_user_id',
})

Property.belongsTo(User, {
	foreignKey: 'fk_user_id',
})

await Property.sync({ alter: false })

export default Property
