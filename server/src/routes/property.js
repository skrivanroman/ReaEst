import express from 'express'
import Property from '../database/property.js'
import User from '../database/user.js'
import Image from '../database/image.js'
import validateReq from './validate-req.js'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Op } from 'sequelize'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const propertyRouter = express.Router()
const IMAGE_FOLER = path.join(fileURLToPath(import.meta.url), '../../../data/properties')
const PAGE_SIZE = 25
const MAIN_THUMB_WIDTH = 650
const MAIN_THUMB_HEIGHT = 452
const THUMB_WIDTH = 270
const THUMB_HEIGHT = 250

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
				'propertyId',
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
			if (property.imagesCount === 0) {
				throw new Error('Implement default image for properties')
			}

			const { dataValues: image } = await Image.findOne({
				attributes: ['width', 'height', 'format'],
				where: {
					property_property_id: property.propertyId,
				},
				order: [['idInProperty', 'ASC']],
			})
			return { ...property, image }
		})

		res.status(200)
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
			include: [
				{
					model: User,
					required: true,
					attributes: ['firstName', 'lastName', 'phone', 'profilePicturePath', 'uuid'],
				},
				{
					model: Image,
					attributes: ['width', 'height', 'format'],
					order: [['idInProperty', 'ASC']],
				},
			],
		})
		if (!property) {
			res.send({ mes: 'not found' })
			return
		}

		const { User: user, Images: images, ...propertyData } = property.dataValues
		res.status(200)
		res.send(
			JSON.stringify({
				property: { ...propertyData, images: images.map((image) => image.dataValues) },
				user: { ...user.dataValues },
			})
		)
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
	images: Joi.array().items(Joi.object()),
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

propertyRouter.post('/property', upload.array('images'), async (req, res) => {
	try {
		if (!req.cookies['auth-token']) {
			throw new Error('No auth token provided for /api/property')
		}

		const propertyData = JSON.parse(req.body.data)
		const { error } = await propertyPostSchema.validateAsync(propertyData)
		if (error) {
			throw new Error(error)
		}

		const propertyId = uuidv4()
		const imageFolderPath = path.join(IMAGE_FOLER, propertyId)
		await fs.mkdir(imageFolderPath, { recursive: true })

		const imageMeta = []
		const waitFor = req.files.map(async (imageBin, index) => {
			const image = sharp(imageBin.buffer)
			const { width, height, format } = await image.metadata()
			if (!['jpg', 'jpeg', 'png', 'webp', 'heif', 'heic'].includes(format)) {
				throw new Error('Unsuported image format at /api/property')
			}
			imageMeta.push({ width, height, format })

			let thumbWidth = THUMB_WIDTH
			let thumbHeight = THUMB_HEIGHT

			if (index === 0) {
				thumbWidth = MAIN_THUMB_WIDTH
				thumbHeight = MAIN_THUMB_HEIGHT
			}
			if (index < 5) {
				image
					.resize(thumbWidth, thumbHeight, { kernel: sharp.kernel.lanczos3 })
					.jpeg({ quality: 85 })
					.withMetadata(false)
					.toFile(path.join(imageFolderPath, `${index}-thumb.jpg`))
			}

			return fs.writeFile(path.join(imageFolderPath, `${index}.${format}`), imageBin.buffer)
		})

		const { email } = jwt.verify(req.cookies['auth-token'], process.env.JWT_SECRET)
		const { userId } = await User.findOne({
			attributes: ['userId'],
			where: {
				email,
			},
		})

		const fields = {
			uuid: propertyId,
			...propertyData,
			imagesCount: imageMeta.length,
			fkUserId: userId,
			Images: imageMeta.map((meta, index) => ({
				idInProperty: index,
				...meta,
			})),
		}
		await Property.create(fields, { include: [{ model: Image }] })

		await Promise.all(waitFor)
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(403)
	}
})

export default propertyRouter
