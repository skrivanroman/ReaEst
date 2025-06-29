import express from 'express'
import User from '../database/user.js'
import Property from '../database/property.js'

const userRouter = express.Router()

userRouter.get('/user/:id', async (req, res) => {
	try {
		const user = await User.findOne({
			attributes: ['firstName', 'lastName', 'phone', 'profilePicturePath', 'description', 'uuid', 'email'],
			where: { uuid: req.params.id },
		})
		if (!user) {
			res.send('user not found')
			return
		}
		const propertyCount = await User.count({
			include: { model: Property, required: true },
			where: { uuid: req.params.id },
		})

		res.send(JSON.stringify({ user: { ...user.dataValues, propertyCount } }))
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

export default userRouter
