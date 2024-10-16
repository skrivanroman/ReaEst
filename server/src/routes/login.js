import express from 'express'
import validateReq from './validate-req.js'
import Joi from 'joi'
import User from '../database/user.js'

const loginRouter = express.Router()

const authSchema = Joi.object({
	email: Joi.string().alphanum().required(),
	password: Joi.string().alphanum().required(),
})

loginRouter.post('/authUser', validateReq(authSchema), async (req, res) => {
	const { email, password } = req.body
	const succes = await User.login(email, password)
	if (succes) res.send('token')
	else res.send('failed')
})

const registerSchema = Joi.object({
	email: Joi.string().alphanum().required(),
	password: Joi.string().alphanum(),
	loginType: Joi.string().allow('google', 'password').required(),
	firstName: Joi.string().alphanum(),
	lastName: Joi.string().alphanum(),
})

loginRouter.post('/register', validateReq(registerSchema), async (req, res) => {
	const { email, password, loginType, firstName, lastName } = req.body
	if (loginType === 'password') await User.register(email, password, firstName, lastName)
})

export default loginRouter
