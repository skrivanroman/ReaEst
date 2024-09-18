import express from 'express'
import loginRouter from './routes/login.js'

const app = express();
const port = 3000;

app.use('/', loginRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

export default app