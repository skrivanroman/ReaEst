import Router from 'express'

const loginRouter = Router()

const authUser = (name, password) => {
    return name === 'admin' && password === '123'
}

loginRouter.post('/login', (req, res, next) => {
    const {name, password} = req.body
    if (authUser(name, password))
        res.header('auth-token', 'gut')
    else
        res.write('login failed')

    res.end()
})

export default loginRouter