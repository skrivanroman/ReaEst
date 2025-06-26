import express from 'express'
import loginRouter from './routes/login.js'
import cors from 'cors'
import propertyRouter from './routes/property.js'
import userRouter from './routes/user.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3001

const allowedOrigins = ['http://localhost:3000', 'https://reaest.com']

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true)
			}
			return callback(new Error(`Origin ${origin} not allowed by CORS`))
		},
		credentials: true,
	})
)
app.use(cookieParser())
app.use(express.json({ limit: '200mb' }))

app.use('/', express.static(path.join(fileURLToPath(import.meta.url), '../../data')))
app.use('/api', loginRouter)
app.use('/api', propertyRouter)
app.use('/api', userRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

export default app
