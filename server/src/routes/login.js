import Router from 'express'

const loginRouter = Router()

const authUser = (name, password) => {
    return name === 'admin' && password === '123'
}

loginRouter.post('/login', (req, res, next) => {
    const {userName, password} = req.body
    if (authUser(userName, password))
        res.write('gut')
    else
        res.write('login failed')

    res.end()
})

export default loginRouter