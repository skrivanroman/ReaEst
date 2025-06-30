import sequelize from './connection.js'
import { DataTypes } from 'sequelize'

const Image = sequelize.define(
	'Image',
	{
		imageId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		idInProperty: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		width: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		format: {
			type: DataTypes.STRING(4),
			defaultValue: 'jpg',
			vallidate: {
				isIn: [['jpg', 'jpeg', 'png', 'webp', 'heif', 'heic']],
			},
		},
	},
	{ underscored: true }
)

export default Image
