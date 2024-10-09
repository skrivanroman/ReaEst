import express from 'express'

const loginRouter = express.Router()

const authUser = (name, password) => {
    return name === 'admin@a.com' && password === '123'
}

loginRouter.post('/authUser', (req, res) => {
    const {userName, password} = req.body
    if (authUser(userName, password))
        res.write('login sucess')
    else
        res.write('login failed')
    
    res.end()
})

export default loginRouter