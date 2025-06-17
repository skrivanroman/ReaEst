const validateReq = (schema) => {
	return async (req, res, next) => {
		try {
			const { error } = await schema.validateAsync(req.method === 'GET' ? req.query : req.body)
			if (error) {
				throw new Error(error)
			}
			next()
		} catch (err) {
			console.log(err)
			res.sendStatus(403)
		}
	}
}
export default validateReq
