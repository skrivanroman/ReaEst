import express from 'express'
import loginRouter from './routes/login.js'
import cors from 'cors'

const app = express();
const port = 3001;

app.use(cors({origin: 'http://127.0.0.1:3000'}))

app.use('/', loginRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

export default app