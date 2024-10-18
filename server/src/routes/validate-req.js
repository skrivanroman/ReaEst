const validateReq = (schema) => {
	return async (req, res, next) => {
		try {
			const { error } = await schema.validateAsync(req.body)
			if (error) {
				throw new Error(error)
			}
			next()
		} catch (err) {
			console.log(err)
			res.end()
		}
	}
}
export default validateReq
