import sequelize from './connection'
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
			defaultValue: 'jpeg',
			vallidate: {
				isIn: [['jpg', 'jpeg', 'png', 'webp', 'heif', 'heic']],
			},
		},
	},
	{ underscored: true }
)

await Image.sync({ alter: true })

export default Image
