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

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '200mb' }))

app.use('/', express.static(path.join(fileURLToPath(import.meta.url), '../../data')))
app.use('/', loginRouter)
app.use('/', propertyRouter)
app.use('/', userRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

export default app
