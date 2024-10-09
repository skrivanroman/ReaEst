import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
})

try {
	await sequelize.authenticate()
	console.log('Connected to the database')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}

export default sequelize
