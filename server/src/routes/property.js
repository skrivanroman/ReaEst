import express from 'express'
import Property from '../database/property.js'
import validateReq from './validate-req.js'
import Joi from 'joi'

const propertyRouter = express.Router()

const propertySchema = Joi.object({
	listingStatus: Joi.string().allow('all', 'buy', 'rent').required(),
	propertyType: Joi.array().items(Joi.string().valid('house', 'apartment', 'office', 'villa')).required(),
	minPrice: Joi.number().integer().positive().required(),
	maxPrice: Joi.number().integer().positive().greater(Joi.ref('minPrice')).required(),
})

propertyRouter.post('/property', async (req, res) => {
	const { title, description, price } = req.body
	await Property.create({ title, description, price })
	res.write('ok')
	res.end()
})

export default propertyRouter
