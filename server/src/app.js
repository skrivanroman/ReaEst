import express from 'express'
import loginRouter from './routes/login.js'
import cors from 'cors'
import sequelize from './database/connection.js'
import User from './database/user.js'
import propertyRouter from './routes/property.js'

//await User.register('admin@test.com', '123', 'tony', 'Shmo')
//console.log(await User.login({ email: 'admin@test.com', password: '133' }))

const app = express()
const port = 3001

app.use(cors({ origin: 'http://localhost:3000' }))
app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials')
	console.log('set')
	next()
})
app.use(express.json())

app.use('/api', loginRouter)
app.use('/api', propertyRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

export default app
