import express from 'express'
import Property from '../database/property.js'
import User from '../database/user.js'
import validateReq from './validate-req.js'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Op } from 'sequelize'

const propertyRouter = express.Router()
const IMAGE_FOLER = path.join(fileURLToPath(import.meta.url), '../../../data/properties')
const PAGE_SIZE = 25

const propertyGetSchema = Joi.object({
	limit: Joi.number().integer().greater(0),
	offset: Joi.number().integer().greater(-1),
	payType: Joi.string().allow('all', 'buy', 'rent'),
	category: Joi.string().allow('all', 'house', 'flat', 'office', 'Cottage', 'land', 'project', 'other'),
	minPrice: Joi.number().integer().positive(),
	maxPrice: Joi.number().integer().positive().greater(Joi.ref('minPrice')),
	userId: Joi.string(),
})

propertyRouter.get('/property', validateReq(propertyGetSchema), async (req, res) => {
	try {
		const searchDetails = {}
		if (req.query.payType && req.query.category !== 'all') {
			searchDetails.payType = req.query.payType
		}
		if (req.query.category && req.query.category !== 'all') {
			searchDetails.category = req.query.category
		}
		if (req.query.minPrice) {
			searchDetails.minPrice = { [Op.gte]: req.query.minPrice }
		}
		if (req.query.maxPrice) {
			searchDetails.maxPrice = { [Op.lte]: req.query.maxPrice }
		}

		let includeDetails = null
		if (req.query.userId) {
			includeDetails = { model: User, required: true, where: { uuid: req.query.userId } }
		}

		const properties = await Property.findAll({
			attributes: [
				'uuid',
				'payType',
				'category',
				'title',
				'price',
				'size',
				'bedroomCount',
				'bathroomCount',
				'imagesCount',
			],
			where: searchDetails,
			include: includeDetails,
			offset: req.query.offset || 0,
			limit: req.query.limit || PAGE_SIZE,
			order: [['createdAt', 'DESC']],
		})

		const withImgData = properties.map(async ({ dataValues: property }) => {
			const images = []
			for (let i = 0; i < property.imagesCount; i++) {
				const {
					info: { width, height },
				} = await sharp(path.join(IMAGE_FOLER, `${property.uuid}/${i}.jpg`)).toBuffer({ resolveWithObject: true })
				images.push({ width, height })
			}
			return { ...property, images }
		})
		res.send(JSON.stringify({ properties: await Promise.all(withImgData) }))
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

propertyRouter.get('/property/:id', async (req, res) => {
	try {
		const property = await Property.findOne({
			attributes: [
				'imagesCount',
				'title',
				'country',
				'price',
				'size',
				'payType',
				'category',
				'status',
				'description',
				'city',
				'street',
				'customId',
				'bedroomCount',
				'bathroomCount',
				'garageCount',
				'availableFrom',
				'yearBuilt',
				'lat',
				'lng',
			],
			where: { uuid: req.params.id },
			include: {
				model: User,
				required: true,
				attributes: ['firstName', 'lastName', 'phone', 'profilePicturePath', 'uuid'],
			},
		})
		if (!property) {
			res.send({ mes: 'not found' })
			return
		}
		const images = []
		for (let i = 0; i < property.dataValues.imagesCount; i++) {
			const {
				info: { width, height },
			} = await sharp(path.join(IMAGE_FOLER, `${req.params.id}/${i}.jpg`)).toBuffer({
				resolveWithObject: true,
			})
			images.push({ width, height })
		}
		const { User: user, ...propertyData } = property.dataValues
		res.send(JSON.stringify({ property: { ...propertyData, images }, user: { ...user.dataValues } }))
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

const propertyPostSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	category: Joi.string().required(),
	price: Joi.number().positive().required(),
	yearlyTax: Joi.number().positive(),
	status: Joi.string(),
	payType: Joi.string().allow('rent', 'buy').required(),
	afterPrice: Joi.string(),
	images: Joi.array().items(Joi.string().dataUri()),
	street: Joi.string(),
	country: Joi.string(),
	city: Joi.string(),
	region: Joi.string(),
	zipCode: Joi.string(),
	cityPart: Joi.string(),
	size: Joi.number().positive(),
	roomCount: Joi.number().integer().greater(-1),
	bedroomCount: Joi.number().integer().greater(-1),
	bathroomCount: Joi.number().integer().greater(-1),
	garageCount: Joi.number().integer().greater(-1),
	customId: Joi.string(),
	yearBuilt: Joi.date(),
	availableFrom: Joi.date(),
	lat: Joi.string(),
	lng: Joi.string(),
})

propertyRouter.post('/property', validateReq(propertyPostSchema), async (req, res) => {
	try {
		if (!req.cookies['auth-token']) {
			throw new Error('No auth token provided for /api/property')
		}

		const propertyId = uuidv4()
		const imageFolderPath = path.join(IMAGE_FOLER, propertyId)
		await fs.mkdir(imageFolderPath, { recursive: true })

		const waitFor = req.body.images?.map((image, index) => {
			const format = image.match(/^data:image\/(\w+);base64,/)[1]?.toLowerCase()
			if (!['jpg', 'jpeg', 'png', 'webp'].includes(format)) {
				throw new Error('Unsuported image format at /api/property')
			}
			const imageData = image.replace(/^data:image\/\w+;base64,/, '')

			//const imageData = image
			if (index !== 0)
				sharp(Buffer.from(imageData, 'base64'))
					.resize(250, 270, { kernel: sharp.kernel.lanczos3 })
					.jpeg()
					.toFile(path.join(imageFolderPath, `${index}-thumb.jpg`))
			return fs.writeFile(path.join(imageFolderPath, `${index}.${'jpg'}`), Buffer.from(imageData, 'base64'))
		})
		await Promise.all(waitFor)

		const { email } = jwt.verify(req.cookies['auth-token'], process.env.JWT_SECRET)
		const { userId } = await User.findOne({
			attributes: ['userId'],
			where: {
				email,
			},
		})

		delete req.body.images
		const fields = {
			uuid: propertyId,
			...req.body,
			imagesCount: waitFor?.length || 0,
			fkUserId: userId, //pouze ludek prozatim
		}
		await Property.create(fields)

		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(403)
	}
})

export default propertyRouter
