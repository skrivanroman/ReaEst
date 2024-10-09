import express from 'express'
import loginRouter from './routes/login.js'
import cors from 'cors'
import sequelize from './database/connection.js'
import User from './database/user.js'

//await User.register('admin@test.com', '123', 'tony', 'Shmo')
console.log(await User.login({ email: 'admin@test.com', password: '133' }))

const app = express()
const port = 3001

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/api', loginRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

export default app
