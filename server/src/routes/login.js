import express from 'express'
import validateReq from './validate-req.js'
import Joi from 'joi'
import User from '../database/user.js'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router()

const authSchema = Joi.object({
	email: Joi.string().email().max(255).required(),
	password: Joi.string().alphanum().max(255).required(),
})

loginRouter.post('/login', validateReq(authSchema), async (req, res) => {
	const { email, password } = req.body
	const succes = await User.login(email, password)
	if (succes) {
		const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' })
		res.set('auth-token', token)
		res.sendStatus(200)
	} else {
		res.sendStatus(401)
	}
})

const registerSchema = Joi.object({
	email: Joi.string().email().max(255).required(),
	password: Joi.string().alphanum().max(255),
	loginOption: Joi.string().allow('google', 'password').required(),
	firstName: Joi.string().alphanum().max(255),
	lastName: Joi.string().alphanum().max(255),
})

loginRouter.post('/register', validateReq(registerSchema), async (req, res) => {
	const { email, password, loginOption, firstName, lastName } = req.body
	console.log('sdfsadfasdfladsjkfjl')
	if (!(await User.register(email, password, loginOption, firstName, lastName))) {
		res.sendStatus(409)
		return
	}

	const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' })

	const oneDay = 24 * 60 * 60 * 1000
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	console.log('hey ya')
	res.cookie('auth-token', token, {
		maxAge: oneDay,
		httpOnly: true,
		secure: false,
		//sameSite: 'strict',
	})
	res.sendStatus(200)
})

export default loginRouter
