const errorTemplate = (res, err, msg) => {
	return res.status(501).json({
		error: {
			message: msg,
			status: err.status
		}
	})
}

module.exports = errorTemplate;