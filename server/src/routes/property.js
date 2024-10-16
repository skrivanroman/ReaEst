import express from 'express'
import Property from '../database/property.js'

const propertyRouter = express.Router()

propertyRouter.post('/property', async (req, res) => {
	const { title, description, price } = req.body
	await Property.create({ title, description, price })
	res.write('ok')
	res.end()
})

export default propertyRouter
